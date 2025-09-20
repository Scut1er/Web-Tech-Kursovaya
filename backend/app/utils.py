from typing import Optional
import json
from datetime import datetime, timedelta, timezone
from itsdangerous import URLSafeSerializer, BadSignature
from .config import settings


CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "овощи": ["лук", "огурец", "томат", "помидор", "морковь", "капуста", "перец", "картофель", "свекла"],
    "фрукты": ["яблоко", "банан", "апельсин", "груша", "киви", "лимон", "ягоды"],
    "молочные": ["молоко", "кефир", "йогурт", "сыр", "творог", "сливки", "ряженка"],
    "крупы": ["рис", "греча", "овсянка", "пшено", "перловка", "макароны", "спагетти"],
    "мясо": ["говядина", "свинина", "курица", "индейка", "фарш", "котлеты"],
    "рыба": ["рыба", "лосось", "тунец", "хек", "минтай", "сельдь"],
    "бакалея": ["сахар", "соль", "масло", "мука", "майонез", "кетчуп", "соус", "перец"],
    "выпечка": ["хлеб", "булка", "батон", "лаваш", "лаваш", "пита"],
    "напитки": ["вода", "сок", "чай", "кофе", "лимонад"],
}


def auto_category_for_name(name: str) -> Optional[str]:
    lower = name.strip().lower()
    for category, keys in CATEGORY_KEYWORDS.items():
        for k in keys:
            if k in lower:
                return category
    return None


def _cookie_signer() -> URLSafeSerializer:
    return URLSafeSerializer(secret_key=settings.secret_key, salt="cookie-user")


def make_user_cookie_payload(user_id: int, username: str) -> str:
    expires_at = (datetime.now(timezone.utc) + timedelta(days=settings.cookie_ttl_days)).isoformat()
    data = {"id": user_id, "username": username, "exp": expires_at}
    return _cookie_signer().dumps(data)


def load_user_cookie_payload(token: str) -> Optional[dict]:
    try:
        data = _cookie_signer().loads(token)
        exp = datetime.fromisoformat(data.get("exp")) if data.get("exp") else None
        if exp and exp < datetime.now(timezone.utc):
            return None
        return data
    except (BadSignature, ValueError):
        return None


