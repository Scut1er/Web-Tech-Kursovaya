"""init schema

Revision ID: 0001_init_schema
Revises: 
Create Date: 2025-09-16 20:00:00

"""
from __future__ import annotations

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0001_init_schema'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('username', sa.String(length=64), nullable=False),
        sa.Column('password_hash', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
    )
    op.create_index('ix_user_username', 'user', ['username'], unique=True)

    op.create_table(
        'sessiontoken',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('token', sa.String(), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('user.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('expires_at', sa.DateTime(), nullable=False),
    )
    op.create_index('ix_sessiontoken_token', 'sessiontoken', ['token'], unique=True)

    op.create_table(
        'room',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('public_id', sa.String(), nullable=False),
        sa.Column('name', sa.String(length=128), nullable=False),
        sa.Column('created_by', sa.Integer(), sa.ForeignKey('user.id'), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
    )
    op.create_index('ix_room_public_id', 'room', ['public_id'], unique=True)

    op.create_table(
        'roommember',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('room_id', sa.Integer(), sa.ForeignKey('room.id'), nullable=False),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('user.id'), nullable=False),
        sa.Column('role', sa.String(), nullable=False, server_default='member'),
        sa.Column('joined_at', sa.DateTime(), nullable=False),
    )

    op.create_table(
        'item',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('room_id', sa.Integer(), sa.ForeignKey('room.id'), nullable=False),
        sa.Column('name', sa.String(length=128), nullable=False),
        sa.Column('quantity', sa.String(length=64), nullable=True),
        sa.Column('category', sa.String(length=64), nullable=True),
        sa.Column('is_purchased', sa.Boolean(), nullable=False, server_default=sa.text('0')),
        sa.Column('purchased_at', sa.DateTime(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('deleted_at', sa.DateTime(), nullable=True),
    )
    op.create_index('ix_item_name', 'item', ['name'])
    op.create_index('ix_item_category', 'item', ['category'])
    op.create_index('ix_item_is_purchased', 'item', ['is_purchased'])
    op.create_index('ix_item_purchased_at', 'item', ['purchased_at'])
    op.create_index('ix_item_deleted_at', 'item', ['deleted_at'])


def downgrade() -> None:
    op.drop_index('ix_item_deleted_at', table_name='item')
    op.drop_index('ix_item_purchased_at', table_name='item')
    op.drop_index('ix_item_is_purchased', table_name='item')
    op.drop_index('ix_item_category', table_name='item')
    op.drop_index('ix_item_name', table_name='item')
    op.drop_table('item')

    op.drop_table('roommember')

    op.drop_index('ix_room_public_id', table_name='room')
    op.drop_table('room')

    op.drop_index('ix_sessiontoken_token', table_name='sessiontoken')
    op.drop_table('sessiontoken')

    op.drop_index('ix_user_username', table_name='user')
    op.drop_table('user')


