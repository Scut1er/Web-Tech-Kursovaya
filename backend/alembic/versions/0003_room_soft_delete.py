"""add deleted_at to room

Revision ID: 0003_room_soft_delete
Revises: 0002_drop_sessiontoken
Create Date: 2025-09-17 21:00:00

"""
from alembic import op
import sqlalchemy as sa

revision = '0003_room_soft_delete'
down_revision = '0002_drop_sessiontoken'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('room', sa.Column('deleted_at', sa.DateTime(), nullable=True))
    op.create_index('ix_room_deleted_at', 'room', ['deleted_at'])


def downgrade() -> None:
    op.drop_index('ix_room_deleted_at', table_name='room')
    op.drop_column('room', 'deleted_at')


