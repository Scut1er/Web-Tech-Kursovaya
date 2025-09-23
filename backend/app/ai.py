from __future__ import annotations

from typing import Optional, Literal

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from .config import settings
from .db import get_session
from .deps import require_room_member
from .models import Item, Room


router = APIRouter()


def _client(provider_override: Optional[str] = None) -> Optional[tuple[str, object]]:
    provider = (provider_override or settings.ai_provider or "").lower()
    if provider == "gemini" and settings.gemini_api_key:
        try:
            import os
            # Приглушаем шумные логи gRPC/absl внутри контейнера
            os.environ.setdefault("GRPC_VERBOSITY", "ERROR")
            os.environ.setdefault("GLOG_minloglevel", "2")

            import google.generativeai as genai  # type: ignore

            genai.configure(api_key=settings.gemini_api_key)
            return ("gemini", genai.GenerativeModel("gemini-1.5-flash"))
        except Exception:  # pragma: no cover
            return None
    if provider == "mistral" and settings.mistral_api_key:
        try:
            from mistralai import Mistral
            return ("mistral", Mistral(api_key=settings.mistral_api_key))
        except Exception:  # pragma: no cover
            return None
    return None


@router.get("/recipes")
def suggest_recipes(
    room: Room = Depends(require_room_member),
    session: Session = Depends(get_session),
    max_dishes: int = 10,
    provider: Optional[Literal["gemini", "mistral"]] = Query(default=None, description="Провайдер ИИ"),
) -> dict:
    items = session.exec(
        select(Item).where((Item.room_id == room.id) & (Item.deleted_at == None))  # noqa: E711
    ).all()
    have = [i.name for i in items if i.is_purchased]
    client_info = _client(provider)
    if not client_info:
        # Простой локальный фолбэк без внешнего API
        base = [{"title": f"Простое блюдо из {n}", "need": []} for n in have[: max(1, min(len(have), max_dishes))]]
        return {"provider": None, "dishes": base}

    prompt = (
        "Ты шеф-повар. Есть список ингредиентов (на русском): "
        + (", ".join(have) if have else "(список пуст)")
        + ". Сформируй не более N блюд." \
        " Для каждого блюда верни объект строго формата JSON: {\"title\": string, \"need\": string[]} где need — СТРОГО перечень недостающих ингредиентов, которых НЕТ в списке. Если всё есть — need=[]" \
        f". Верни строго JSON массив без текста вокруг. N={max_dishes}."
    )
    print(prompt)
    sel_provider, client = client_info if client_info else (None, None)
    try:
        if sel_provider == "gemini":
            result = client.generate_content(prompt)
            text = (result.candidates[0].content.parts[0].text if getattr(result, "candidates", None) else "")
        elif sel_provider == "mistral":
            # Chat Completions API Mistral
            resp = client.chat.complete(model="mistral-small-latest", messages=[{"role": "user", "content": prompt}])
            text = resp.choices[0].message.content if getattr(resp, "choices", None) else ""
        else:
            text = ""
    except Exception as e:  # сеть/квота и т.п.
        return {"provider": sel_provider, "error": str(e), "dishes": []}

    # Лояльный парсинг JSON-подобного ответа
    import json, re  # noqa: E401

    # Предпочитаем блок с тройными кавычками ```json
    fence = re.search(r"```json\s*([\s\S]*?)```", text, flags=re.IGNORECASE)
    candidate = fence.group(1) if fence else text
    match = re.search(r"\[[\s\S]*\]|\{[\s\S]*\}", candidate)
    try:
        data = json.loads(match.group(0)) if match else json.loads(candidate)
        if isinstance(data, dict) and "dishes" in data:
            dishes = data["dishes"]
        elif isinstance(data, list):
            dishes = data
        else:
            dishes = []
    except Exception:
        dishes = []

    # Нормализация и извлечение недостающих ингредиентов
    def normalize_text(s: str) -> str:
        return re.sub(r"\s+", " ", s.strip().lower())

    have_norm = [normalize_text(x) for x in have]

    def extract_need(entry: dict, title: str) -> list[str]:
        need: list[str] = []
        if isinstance(entry, dict):
            if isinstance(entry.get("need"), list):
                need = [str(x) for x in entry.get("need")]
            elif isinstance(entry.get("missing"), str):
                need = re.split(r",| и | and |\+|/", entry["missing"])  # грубое разбиение перечислений
            elif isinstance(entry.get("need_one"), str):
                need = re.split(r",| и | and |\+|/", entry["need_one"])
            elif entry.get("need_one?") is True:
                # Попробовать вытащить ингредиенты из заголовка
                m = re.search(r"необ(?:ходимо)?\s+добавить\s+(.+?)\)?$", title, flags=re.IGNORECASE)
                if m:
                    need = re.split(r",| и | and |\+|/", m.group(1))
        # очистка и фильтрация по имеющимся
        cleaned: list[str] = []
        for n in need:
            nn = normalize_text(n).strip(". ,;:()[]{}\"')")
            if not nn:
                continue
            present = any(nn in hv or hv in nn for hv in have_norm)
            if not present:
                cleaned.append(n.strip())
        return cleaned

    norm = []
    for d in dishes:
        title = d.get("title") if isinstance(d, dict) else str(d)
        if not title:
            continue
        need_list = extract_need(d if isinstance(d, dict) else {}, title)
        norm.append({"title": title, "need": need_list})

    # Сортировка по возрастанию количества недостающих и ограничение по N
    norm.sort(key=lambda x: len(x["need"]))
    norm = norm[:max_dishes]

    return {"provider": sel_provider, "dishes": norm}


