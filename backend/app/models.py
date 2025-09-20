import uuid
from datetime import datetime, timedelta
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


def generate_uuid() -> str:
    return str(uuid.uuid4())


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, min_length=3, max_length=64)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    memberships: List["RoomMember"] = Relationship(back_populates="user")





class Room(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    public_id: str = Field(index=True, unique=True, default_factory=generate_uuid)
    name: str = Field(max_length=128)
    created_by: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    deleted_at: Optional[datetime] = Field(default=None, index=True)

    members: List["RoomMember"] = Relationship(back_populates="room")
    items: List["Item"] = Relationship(back_populates="room")


class RoomMember(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    room_id: int = Field(foreign_key="room.id")
    user_id: int = Field(foreign_key="user.id")
    role: str = Field(default="member")  # "member" | "owner"
    joined_at: datetime = Field(default_factory=datetime.utcnow)

    room: Optional["Room"] = Relationship(back_populates="members")
    user: Optional["User"] = Relationship(back_populates="memberships")


class Item(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    room_id: int = Field(foreign_key="room.id")
    name: str = Field(index=True, max_length=128)
    quantity: Optional[str] = Field(default=None, max_length=64)
    category: Optional[str] = Field(default=None, index=True, max_length=64)
    is_purchased: bool = Field(default=False, index=True)
    purchased_at: Optional[datetime] = Field(default=None, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    deleted_at: Optional[datetime] = Field(default=None, index=True)

    room: Optional["Room"] = Relationship(back_populates="items")


