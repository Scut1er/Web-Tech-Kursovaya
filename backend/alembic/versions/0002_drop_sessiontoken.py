"""drop deprecated session token table

Revision ID: 0002_drop_sessiontoken
Revises: 0001_init_schema
Create Date: 2025-09-17 20:30:00

"""
from alembic import op
import sqlalchemy as sa

revision = '0002_drop_sessiontoken'
down_revision = '0001_init_schema'
branch_labels = None
depends_on = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    tables = inspector.get_table_names()
    # поддержим как старое имя, так и новое _deprecated имя
    for t in ('sessiontoken', '_deprecated_sessiontoken'):
        if t in tables:
            op.drop_table(t)


def downgrade() -> None:
    # не восстанавливаем
    pass


