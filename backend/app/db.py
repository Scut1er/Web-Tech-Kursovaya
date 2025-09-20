from typing import Iterator

from sqlmodel import SQLModel, Session, create_engine
from .config import settings


DB_URL = settings.database_url or "sqlite:///./backend/app.db"
connect_args = {"check_same_thread": False} if DB_URL.startswith("sqlite") else {}
engine = create_engine(DB_URL, echo=False, connect_args=connect_args)


def create_db_and_tables() -> None:
    # Импорт моделей здесь, чтобы таблицы были зарегистрированы перед созданием
    from . import models  # noqa: F401

    SQLModel.metadata.create_all(engine)


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session

