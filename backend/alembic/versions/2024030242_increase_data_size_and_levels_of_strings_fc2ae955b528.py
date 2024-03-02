"""Increase data size and levels of strings

Revision ID: fc2ae955b528
Revises: 3f23d8aca832
Create Date: 2024-03-02 16:42:21.562347

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "fc2ae955b528"
down_revision = "3f23d8aca832"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "event",
        "desc",
        existing_type=sa.VARCHAR(length=120),
        type_=sa.String(length=300),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "position",
        existing_type=sa.VARCHAR(length=30),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "responsibility",
        existing_type=sa.VARCHAR(length=120),
        type_=sa.String(length=300),
        existing_nullable=False,
    )
    op.alter_column(
        "sponsor",
        "desc",
        existing_type=sa.VARCHAR(length=120),
        type_=sa.String(length=300),
        existing_nullable=False,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "sponsor",
        "desc",
        existing_type=sa.String(length=300),
        type_=sa.VARCHAR(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "responsibility",
        existing_type=sa.String(length=300),
        type_=sa.VARCHAR(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "position",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=30),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "desc",
        existing_type=sa.String(length=300),
        type_=sa.VARCHAR(length=120),
        existing_nullable=False,
    )
    # ### end Alembic commands ###