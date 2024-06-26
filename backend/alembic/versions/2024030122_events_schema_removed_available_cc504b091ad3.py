"""events schema removed available

Revision ID: cc504b091ad3
Revises: a79df019647f
Create Date: 2024-03-01 21:22:24.825590

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "cc504b091ad3"
down_revision = "a79df019647f"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("event", "available")
    op.create_unique_constraint(None, "venue", ["name"])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "venue", type_="unique")
    op.add_column(
        "event",
        sa.Column("available", sa.INTEGER(), autoincrement=False, nullable=False),
    )
    # ### end Alembic commands ###
