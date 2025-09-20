from datetime import datetime
from typing import Optional

from fastapi import Depends, HTTPException, status, Request
from sqlmodel import Session, select

from .config import settings
from .db import get_session
from .models import Room, RoomMember, User
from .utils import load_user_cookie_payload


def get_current_user(request: Request, session: Session = Depends(get_session)) -> User:
    token_value = request.cookies.get(settings.session_cookie_name)
    if not token_value:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    payload = load_user_cookie_payload(token_value)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired cookie")
    user = session.exec(select(User).where(User.id == payload.get("id"))).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


def require_room_member(
    room_public_id: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
) -> Room:
    room = session.exec(select(Room).where(Room.public_id == room_public_id)).first()
    if room is None:
        raise HTTPException(status_code=404, detail="Room not found")
    membership = session.exec(
        select(RoomMember).where((RoomMember.room_id == room.id) & (RoomMember.user_id == current_user.id))
    ).first()
    if membership is None:
        raise HTTPException(status_code=403, detail="Not a room member")
    return room


