"""Constraints Improved

Revision ID: ee97f3e67f04
Revises: 2f0d39aa00c2
Create Date: 2024-03-02 15:38:46.234814

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ee97f3e67f04"
down_revision = "2f0d39aa00c2"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("competition_id_fkey", "competition", type_="foreignkey")
    op.create_foreign_key(
        None,
        "competition",
        "event",
        ["id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.drop_constraint("event_venue_fkey", "event", type_="foreignkey")
    op.create_foreign_key(
        None,
        "event",
        "venue",
        ["venue"],
        ["name"],
        onupdate="SET NULL",
        ondelete="SET NULL",
    )
    op.drop_constraint("manage_event_id_fkey", "manage", type_="foreignkey")
    op.drop_constraint("manage_id_fkey", "manage", type_="foreignkey")
    op.create_foreign_key(
        None, "manage", "user", ["id"], ["id"], onupdate="CASCADE", ondelete="CASCADE"
    )
    op.create_foreign_key(
        None,
        "manage",
        "event",
        ["event_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.drop_constraint("participant_mess_fkey", "participant", type_="foreignkey")
    op.drop_constraint("participant_id_fkey", "participant", type_="foreignkey")
    op.drop_constraint(
        "participant_accomodation_fkey", "participant", type_="foreignkey"
    )
    op.create_foreign_key(
        None,
        "participant",
        "accomodation",
        ["accomodation"],
        ["id"],
        onupdate="SET NULL",
        ondelete="SET NULL",
    )
    op.create_foreign_key(
        None,
        "participant",
        "user",
        ["id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        None,
        "participant",
        "mess",
        ["mess"],
        ["id"],
        onupdate="SET NULL",
        ondelete="SET NULL",
    )
    op.add_column(
        "prize", sa.Column("winner_id", sa.UUID(as_uuid=False), nullable=False)
    )
    op.drop_constraint("prize_user_id_fkey", "prize", type_="foreignkey")
    op.drop_constraint("prize_event_id_fkey", "prize", type_="foreignkey")
    op.create_foreign_key(
        None,
        "prize",
        "user",
        ["winner_id"],
        ["id"],
        onupdate="SET NULL",
        ondelete="SET NULL",
    )
    op.create_foreign_key(
        None,
        "prize",
        "event",
        ["event_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.drop_column("prize", "user_id")
    op.drop_constraint("registration_user_id_fkey", "registration", type_="foreignkey")
    op.drop_constraint("registration_event_id_fkey", "registration", type_="foreignkey")
    op.create_foreign_key(
        None,
        "registration",
        "user",
        ["user_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        None,
        "registration",
        "event",
        ["event_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADe",
    )
    op.drop_constraint("sponsorship_sponsor_id_fkey", "sponsorship", type_="foreignkey")
    op.drop_constraint("sponsorship_event_id_fkey", "sponsorship", type_="foreignkey")
    op.create_foreign_key(
        None,
        "sponsorship",
        "sponsor",
        ["sponsor_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        None,
        "sponsorship",
        "event",
        ["event_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.drop_constraint("student_id_fkey", "student", type_="foreignkey")
    op.create_foreign_key(
        None, "student", "user", ["id"], ["id"], onupdate="CASCADE", ondelete="CASCADE"
    )
    op.drop_constraint("volunteer_event_id_fkey", "volunteer", type_="foreignkey")
    op.drop_constraint("volunteer_id_fkey", "volunteer", type_="foreignkey")
    op.create_foreign_key(
        None,
        "volunteer",
        "user",
        ["id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        None,
        "volunteer",
        "event",
        ["event_id"],
        ["id"],
        onupdate="CASCADE",
        ondelete="CASCADE",
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "volunteer", type_="foreignkey")
    op.drop_constraint(None, "volunteer", type_="foreignkey")
    op.create_foreign_key("volunteer_id_fkey", "volunteer", "user", ["id"], ["id"])
    op.create_foreign_key(
        "volunteer_event_id_fkey", "volunteer", "event", ["event_id"], ["id"]
    )
    op.drop_constraint(None, "student", type_="foreignkey")
    op.create_foreign_key("student_id_fkey", "student", "user", ["id"], ["id"])
    op.drop_constraint(None, "sponsorship", type_="foreignkey")
    op.drop_constraint(None, "sponsorship", type_="foreignkey")
    op.create_foreign_key(
        "sponsorship_event_id_fkey", "sponsorship", "event", ["event_id"], ["id"]
    )
    op.create_foreign_key(
        "sponsorship_sponsor_id_fkey", "sponsorship", "sponsor", ["sponsor_id"], ["id"]
    )
    op.drop_constraint(None, "registration", type_="foreignkey")
    op.drop_constraint(None, "registration", type_="foreignkey")
    op.create_foreign_key(
        "registration_event_id_fkey", "registration", "event", ["event_id"], ["id"]
    )
    op.create_foreign_key(
        "registration_user_id_fkey", "registration", "user", ["user_id"], ["id"]
    )
    op.add_column(
        "prize", sa.Column("user_id", sa.UUID(), autoincrement=False, nullable=False)
    )
    op.drop_constraint(None, "prize", type_="foreignkey")
    op.drop_constraint(None, "prize", type_="foreignkey")
    op.create_foreign_key("prize_event_id_fkey", "prize", "event", ["event_id"], ["id"])
    op.create_foreign_key("prize_user_id_fkey", "prize", "user", ["user_id"], ["id"])
    op.drop_column("prize", "winner_id")
    op.drop_constraint(None, "participant", type_="foreignkey")
    op.drop_constraint(None, "participant", type_="foreignkey")
    op.drop_constraint(None, "participant", type_="foreignkey")
    op.create_foreign_key(
        "participant_accomodation_fkey",
        "participant",
        "accomodation",
        ["accomodation"],
        ["id"],
    )
    op.create_foreign_key("participant_id_fkey", "participant", "user", ["id"], ["id"])
    op.create_foreign_key(
        "participant_mess_fkey", "participant", "mess", ["mess"], ["id"]
    )
    op.drop_constraint(None, "manage", type_="foreignkey")
    op.drop_constraint(None, "manage", type_="foreignkey")
    op.create_foreign_key("manage_id_fkey", "manage", "user", ["id"], ["id"])
    op.create_foreign_key(
        "manage_event_id_fkey", "manage", "event", ["event_id"], ["id"]
    )
    op.drop_constraint(None, "event", type_="foreignkey")
    op.create_foreign_key("event_venue_fkey", "event", "venue", ["venue"], ["name"])
    op.drop_constraint(None, "competition", type_="foreignkey")
    op.create_foreign_key("competition_id_fkey", "competition", "event", ["id"], ["id"])
    # ### end Alembic commands ###