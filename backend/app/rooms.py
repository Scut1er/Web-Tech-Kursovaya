from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from .db import get_session
from .deps import get_current_user
from .models import Room, RoomMember, User
from .schemas import JoinRoomRequest, RoomCreate, RoomOut


router = APIRouter()


@router.post("/create", response_model=RoomOut)
def create_room(payload: RoomCreate, session: Session = Depends(get_session), user: User = Depends(get_current_user)) -> RoomOut:
    room = Room(name=payload.name, created_by=user.id)
    session.add(room)
    session.commit()
    session.refresh(room)
    membership = RoomMember(room_id=room.id, user_id=user.id, role="owner")
    session.add(membership)
    session.commit()
    return RoomOut(
        id=room.id,
        public_id=room.public_id,
        name=room.name,
        created_by=room.created_by,
        created_at=room.created_at,
    )


@router.post("/join", response_model=RoomOut)
def join_room(payload: JoinRoomRequest, session: Session = Depends(get_session), user: User = Depends(get_current_user)) -> RoomOut:
    room = session.exec(select(Room).where((Room.public_id == payload.public_id) & (Room.deleted_at == None))).first()  # noqa: E711
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    existing = session.exec(
        select(RoomMember).where((RoomMember.room_id == room.id) & (RoomMember.user_id == user.id))
    ).first()
    if existing is None:
        session.add(RoomMember(room_id=room.id, user_id=user.id, role="member"))
        session.commit()
    return RoomOut(
        id=room.id,
        public_id=room.public_id,
        name=room.name,
        created_by=room.created_by,
        created_at=room.created_at,
    )


@router.get("/my", response_model=list[RoomOut])
def my_rooms(session: Session = Depends(get_session), user: User = Depends(get_current_user)) -> list[RoomOut]:
    memberships = session.exec(select(RoomMember).where(RoomMember.user_id == user.id)).all()
    room_ids = [m.room_id for m in memberships]
    if not room_ids:
        return []
    rooms = session.exec(select(Room).where((Room.id.in_(room_ids)) & (Room.deleted_at == None))).all()  # noqa: E711
    return [
        RoomOut(
            id=r.id,
            public_id=r.public_id,
            name=r.name,
            created_by=r.created_by,
            created_at=r.created_at,
        )
        for r in rooms
    ]


@router.delete("/{public_id}")
def delete_room(public_id: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)) -> dict:
    room = session.exec(select(Room).where(Room.public_id == public_id)).first()
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    # Только владелец
    if room.created_by != user.id:
        raise HTTPException(status_code=403, detail="Only owner can delete room")
    # Soft-delete комнаты и всех её items
    from datetime import datetime as _dt
    from .models import Item

    now = _dt.utcnow()
    room.deleted_at = now
    session.add(room)
    items = session.exec(select(Item).where((Item.room_id == room.id) & (Item.deleted_at == None))).all()  # noqa: E711
    for it in items:
        it.deleted_at = now
        session.add(it)
    session.commit()
    return {"ok": True}


