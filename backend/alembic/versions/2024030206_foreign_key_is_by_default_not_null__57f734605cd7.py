"""Foreign Key is by default not null, changed

Revision ID: 57f734605cd7
Revises: 69cd98cf4a05
Create Date: 2024-03-02 17:06:21.709164

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "57f734605cd7"
down_revision = "69cd98cf4a05"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "event", "venue", existing_type=sa.VARCHAR(length=30), nullable=True
    )
    op.alter_column(
        "participant", "accomodation_id", existing_type=sa.UUID(), nullable=True
    )
    op.alter_column("participant", "mess_id", existing_type=sa.UUID(), nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column("participant", "mess_id", existing_type=sa.UUID(), nullable=False)
    op.alter_column(
        "participant", "accomodation_id", existing_type=sa.UUID(), nullable=False
    )
    op.alter_column(
        "event", "venue", existing_type=sa.VARCHAR(length=30), nullable=False
    )
    # ### end Alembic commands ###
