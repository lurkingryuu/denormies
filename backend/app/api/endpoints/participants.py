from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models import Participant
from app.schemas.responses import ParticipantResponse
from app.schemas.requests import BaseUser, ParticipantCreateRequest


router = APIRouter()


@router.post("/me", response_model=ParticipantResponse, status_code=status.HTTP_201_CREATED)
async def create_participant(
    new_participant: ParticipantCreateRequest,
    current_user: BaseUser = Depends(deps.get_current_user),
    session: AsyncSession = Depends(deps.get_session),
):
    """Create a new participant"""
    participant = Participant(
        id=current_user.id,
        university=new_participant.university,
    )
    session.add(participant)
    await session.commit()

    participant_in_db = await session.execute(select(Participant).filter(Participant.id == current_user.id))
    participant_in_db = participant_in_db.scalar_one()
    if participant_in_db is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Inconsistent data")
    
    return ParticipantResponse(
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone if current_user.phone else "",
        university=participant_in_db.university,
        accomodation=participant_in_db.accomodation_id,
        mess=participant_in_db.mess_id,
    )


@router.get("/me", response_model=ParticipantResponse, status_code=status.HTTP_200_OK)
async def read_participant_me(
    current_user: BaseUser = Depends(deps.get_current_user),
    session: AsyncSession = Depends(deps.get_session),
):
    """Read current participant"""
    if current_user.role != "participant":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a participant")
    participant = await session.execute(select(Participant).filter(Participant.id == current_user.id))
    participant = participant.scalar_one()
    if participant is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Inconsistent data")
    return ParticipantResponse(
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone if current_user.phone else "",
        university=participant.university,
        accomodation=participant.accomodation_id,
        mess=participant.mess_id,
    )


# ----------------- Restricted -----------------
