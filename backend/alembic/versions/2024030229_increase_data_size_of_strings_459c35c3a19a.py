"""Increase data size of strings

Revision ID: 459c35c3a19a
Revises: ad8884ef3f1c
Create Date: 2024-03-02 16:29:57.234626

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "459c35c3a19a"
down_revision = "ad8884ef3f1c"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "accomodation",
        "name",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "accomodation",
        "location",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "competition",
        "props",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "name",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "type",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "desc",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "venue",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "position",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "responsibility",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "mess",
        "name",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "mess",
        "location",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "participant",
        "university",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "sponsor",
        "name",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "sponsor",
        "desc",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "student",
        "roll",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "student",
        "dept",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "name",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "phone",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=True,
    )
    op.alter_column(
        "user",
        "email",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "role",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "password",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    op.alter_column(
        "venue",
        "name",
        existing_type=sa.VARCHAR(length=20),
        type_=sa.String(length=40),
        existing_nullable=False,
    )
    op.alter_column(
        "venue",
        "location",
        existing_type=sa.VARCHAR(length=100),
        type_=sa.String(length=120),
        existing_nullable=False,
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "venue",
        "location",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "venue",
        "name",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "password",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "role",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "email",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "user",
        "phone",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=True,
    )
    op.alter_column(
        "user",
        "name",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "student",
        "dept",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "student",
        "roll",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "sponsor",
        "desc",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "sponsor",
        "name",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "participant",
        "university",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "mess",
        "location",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "mess",
        "name",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "responsibility",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "manage",
        "position",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "venue",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "desc",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "type",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "event",
        "name",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    op.alter_column(
        "competition",
        "props",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "accomodation",
        "location",
        existing_type=sa.String(length=120),
        type_=sa.VARCHAR(length=100),
        existing_nullable=False,
    )
    op.alter_column(
        "accomodation",
        "name",
        existing_type=sa.String(length=40),
        type_=sa.VARCHAR(length=20),
        existing_nullable=False,
    )
    # ### end Alembic commands ###