from __future__ import annotations

from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field


# Аутентификация
class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=64)
    password: str = Field(min_length=6, max_length=128)


class UserOut(BaseModel):
    id: int
    username: str
    created_at: datetime


class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str
    user: UserOut


# Комнаты
class RoomCreate(BaseModel):
    name: str = Field(min_length=1, max_length=128)


class RoomOut(BaseModel):
    id: int
    public_id: str
    name: str
    created_by: int
    created_at: datetime


class JoinRoomRequest(BaseModel):
    public_id: str


# Продукты
SortBy = Literal["created", "category", "purchased_at"]


class ItemBase(BaseModel):
    name: str = Field(min_length=1, max_length=128)
    quantity: Optional[str] = Field(default=None, max_length=64)
    category: Optional[str] = Field(default=None, max_length=64)


class ItemCreate(ItemBase):
    pass


class ItemUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=128)
    quantity: Optional[str] = Field(default=None, max_length=64)
    category: Optional[str] = Field(default=None, max_length=64)


class ItemOut(BaseModel):
    id: int
    room_id: int
    name: str
    quantity: Optional[str]
    category: Optional[str]
    is_purchased: bool
    purchased_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime]


# Участники комнат
class RoomMemberOut(BaseModel):
    id: int
    user_id: int
    username: str
    role: str
    joined_at: datetime


