from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .config import settings
from .db import create_db_and_tables
from .auth import router as auth_router
from .rooms import router as rooms_router
from .items import router as items_router
from .ai import router as ai_router


app = FastAPI(title="Shopping Rooms API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()


app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(rooms_router, prefix="/rooms", tags=["rooms"])
app.include_router(items_router, prefix="/rooms/{room_public_id}/items", tags=["items"])
app.include_router(ai_router, prefix="/rooms/{room_public_id}/ai", tags=["ai"])

# Единый формат ошибок {code, details}
@app.exception_handler(Exception)
async def unhandled_error_handler(request: Request, exc: Exception):
    # Для простоты не различаем статусы; кастомные HTTPException и так отдаются FastAPI
    return JSONResponse(status_code=500, content={"details": str(exc)})




