from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Response, status, Request
from passlib.context import CryptContext
from sqlmodel import Session, select

from .config import settings
from .db import get_session
from .models import Room, RoomMember, User
from .schemas import LoginRequest, LoginResponse, RoomOut, UserCreate, UserOut
from .utils import make_user_cookie_payload, load_user_cookie_payload


router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


@router.post("/register", response_model=UserOut)
def register(payload: UserCreate, session: Session = Depends(get_session)) -> UserOut:
    existing = session.exec(select(User).where(User.username == payload.username)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    user = User(username=payload.username, password_hash=hash_password(payload.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserOut(id=user.id, username=user.username, created_at=user.created_at)


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, response: Response, session: Session = Depends(get_session)) -> LoginResponse:
    user = session.exec(select(User).where(User.username == payload.username)).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = make_user_cookie_payload(user_id=user.id, username=user.username)
    # Срок жизни задаём через Max-Age; браузер сам удалит cookie по истечению
    max_age = settings.cookie_ttl_days * 24 * 60 * 60
    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        httponly=True,
        samesite="Lax",
        max_age=max_age,
    )
    return LoginResponse(
        token=token,
        user=UserOut(id=user.id, username=user.username, created_at=user.created_at),
    )


@router.post("/logout")
def logout(response: Response) -> dict:
    response.delete_cookie(settings.session_cookie_name)
    return {"ok": True}


@router.get("/fetch_session", response_model=UserOut)
def fetch_session(request: Request, session: Session = Depends(get_session)) -> UserOut:
    token_value = request.cookies.get(settings.session_cookie_name)
    if not token_value:
        raise HTTPException(status_code=403, detail="Not authenticated")
    payload = load_user_cookie_payload(token_value)
    if not payload:
        raise HTTPException(status_code=403, detail="Invalid session")
    user = session.exec(select(User).where(User.id == payload.get("id"))).first()
    if user is None:
        raise HTTPException(status_code=403, detail="User not found")
    return UserOut(id=user.id, username=user.username, created_at=user.created_at)


