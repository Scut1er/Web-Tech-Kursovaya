from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from .db import get_session
from .deps import get_current_user, require_room_member
from .models import Room, RoomMember, User
from .schemas import JoinRoomRequest, RoomCreate, RoomOut, RoomMemberOut


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


@router.get("/{public_id}/members", response_model=list[RoomMemberOut])
def list_members(public_id: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)) -> list[RoomMemberOut]:
    room = session.exec(select(Room).where((Room.public_id == public_id) & (Room.deleted_at == None))).first()  # noqa: E711
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    # доступ только участникам
    membership = session.exec(
        select(RoomMember).where((RoomMember.room_id == room.id) & (RoomMember.user_id == user.id))
    ).first()
    if membership is None:
        raise HTTPException(status_code=403, detail="Not a room member")
    members = session.exec(select(RoomMember).where(RoomMember.room_id == room.id)).all()
    # подгружаем имена
    user_ids = [m.user_id for m in members]
    users = session.exec(select(User).where(User.id.in_(user_ids))).all() if user_ids else []
    id_to_username = {u.id: u.username for u in users}
    return [
        RoomMemberOut(
            id=m.id,
            user_id=m.user_id,
            username=id_to_username.get(m.user_id, "unknown"),
            role=m.role,
            joined_at=m.joined_at,
        )
        for m in members
    ]


@router.post("/{public_id}/leave")
def leave_room(public_id: str, session: Session = Depends(get_session), user: User = Depends(get_current_user)) -> dict:
    room = session.exec(select(Room).where((Room.public_id == public_id) & (Room.deleted_at == None))).first()  # noqa: E711
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    membership = session.exec(
        select(RoomMember).where((RoomMember.room_id == room.id) & (RoomMember.user_id == user.id))
    ).first()
    if membership is None:
        raise HTTPException(status_code=404, detail="Not in room")
    # владелец не может покинуть комнату
    if membership.role == "owner":
        raise HTTPException(status_code=400, detail="Owner can't leave")
    session.delete(membership)
    session.commit()
    return {"ok": True}


