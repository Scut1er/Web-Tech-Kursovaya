from __future__ import annotations

from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select

from .db import get_session
from .deps import require_room_member
from .models import Item, Room
from .schemas import ItemCreate, ItemOut, ItemUpdate, SortBy
from .utils import auto_category_for_name


router = APIRouter()




@router.get("/", response_model=list[ItemOut])
def list_items(
    room: Room = Depends(require_room_member),
    session: Session = Depends(get_session),
    sort_by: SortBy = Query(default="created"),
) -> list[ItemOut]:
    stmt = select(Item).where((Item.room_id == room.id) & (Item.deleted_at == None))  # noqa: E711

    if sort_by == "created":
        stmt = stmt.order_by(Item.created_at.desc())
    elif sort_by == "category":
        # Простой кросс-СУБД сорт: сначала категория (NULL как получится), потом имя
        stmt = stmt.order_by(Item.category.asc(), Item.name.asc())
    elif sort_by == "purchased_at":
        # Сначала не купленные, затем купленные по убыванию времени покупки
        stmt = stmt.order_by(Item.is_purchased.asc(), Item.purchased_at.desc())

    items = session.exec(stmt).all()
    return [
        ItemOut(
            id=i.id,
            room_id=i.room_id,
            name=i.name,
            quantity=i.quantity,
            category=i.category,
            is_purchased=i.is_purchased,
            purchased_at=i.purchased_at,
            created_at=i.created_at,
            updated_at=i.updated_at,
            deleted_at=i.deleted_at,
        )
        for i in items
    ]


@router.post("/", response_model=ItemOut)
def create_item(payload: ItemCreate, room: Room = Depends(require_room_member), session: Session = Depends(get_session)) -> ItemOut:
    category = payload.category or auto_category_for_name(payload.name) or "Другое"
    item = Item(
        room_id=room.id,
        name=payload.name.strip(),
        quantity=(payload.quantity.strip() if payload.quantity else None),
        category=category,
    )
    session.add(item)
    session.commit()
    session.refresh(item)
    return ItemOut(**item.dict())


@router.patch("/{item_id}", response_model=ItemOut)
def update_item(
    item_id: int,
    payload: ItemUpdate,
    room: Room = Depends(require_room_member),
    session: Session = Depends(get_session),
) -> ItemOut:
    item = session.get(Item, item_id)
    if item is None or item.room_id != room.id or item.deleted_at is not None:
        raise HTTPException(status_code=404, detail="Item not found")
    if payload.name is not None:
        item.name = payload.name.strip()
    if payload.quantity is not None:
        item.quantity = payload.quantity.strip() if payload.quantity else None
    if payload.category is not None:
        item.category = payload.category or auto_category_for_name(item.name) or "Другое"
    item.updated_at = datetime.utcnow()
    session.add(item)
    session.commit()
    session.refresh(item)
    return ItemOut(**item.dict())


@router.post("/{item_id}/toggle", response_model=ItemOut)
def toggle_purchase(item_id: int, room: Room = Depends(require_room_member), session: Session = Depends(get_session)) -> ItemOut:
    item = session.get(Item, item_id)
    if item is None or item.room_id != room.id or item.deleted_at is not None:
        raise HTTPException(status_code=404, detail="Item not found")
    item.is_purchased = not item.is_purchased
    item.purchased_at = datetime.utcnow() if item.is_purchased else None
    item.updated_at = datetime.utcnow()
    session.add(item)
    session.commit()
    session.refresh(item)
    return ItemOut(**item.dict())


@router.delete("/{item_id}")
def soft_delete_item(item_id: int, room: Room = Depends(require_room_member), session: Session = Depends(get_session)) -> dict:
    item = session.get(Item, item_id)
    if item is None or item.room_id != room.id or item.deleted_at is not None:
        raise HTTPException(status_code=404, detail="Item not found")
    item.deleted_at = datetime.utcnow()
    item.updated_at = datetime.utcnow()
    session.add(item)
    session.commit()
    return {"ok": True, "deleted_at": item.deleted_at.isoformat()}


@router.post("/{item_id}/undo")
def undo_delete_item(item_id: int, room: Room = Depends(require_room_member), session: Session = Depends(get_session)) -> dict:
    item = session.get(Item, item_id)
    if item is None or item.room_id != room.id or item.deleted_at is None:
        raise HTTPException(status_code=404, detail="Nothing to restore")
    item.deleted_at = None
    item.updated_at = datetime.utcnow()
    session.add(item)
    session.commit()
    return {"ok": True}


