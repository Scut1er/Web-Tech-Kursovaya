from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator


def _split_csv(value: str | None) -> list[str]:
    if not value:
        return []
    return [v.strip() for v in value.split(",") if v.strip()]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_prefix="APP_", extra="ignore")

    secret_key: str = "dev-secret-key-change"
    session_cookie_name: str = "session_token"
    database_url: str | None = None
    cors_origins: list[str] = []
    cookie_ttl_days: int = 14

    hide_purchased_after_days: int = 7

    # AI
    ai_provider: str | None = "gemini"
    gemini_api_key: str | None = None


    @field_validator("cors_origins", mode="before")
    @classmethod
    def _parse_cors(cls, v):
        if v is None or v == "":
            return []
        if isinstance(v, str):
            try:
                import json

                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                pass
            return _split_csv(v)
        return v


_s = Settings()
if not _s.cors_origins:
    _s.cors_origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
settings = _s

