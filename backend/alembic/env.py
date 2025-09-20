from __future__ import annotations

from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context

import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
APP_DIR = os.path.join(BASE_DIR, 'app')
if APP_DIR not in sys.path:
    sys.path.append(APP_DIR)

from app.db import DB_URL  # noqa
from app.models import SQLModel  # type: ignore


config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

def get_url() -> str:
    # Use runtime DB_URL from app
    if DB_URL.startswith('sqlite:///./'):
        # Alembic runs from backend/, map to file in working dir
        return 'sqlite:///app.db'
    return DB_URL

target_metadata = SQLModel.metadata


def run_migrations_offline() -> None:
    url = get_url()
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True, compare_type=True)
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    configuration = config.get_section(config.config_ini_section)
    if configuration is None:
        configuration = {}
    configuration['sqlalchemy.url'] = get_url()

    connectable = engine_from_config(
        configuration,
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata, compare_type=True)
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()


