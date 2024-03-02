from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models import Participant, Event, User
from app.schemas.responses import List, ParticipantResponse, StudentResponse, StudentVolunteerResponse
from app.schemas.requests import BaseUser, ParticipantCreateRequest, StudentCreateRequest, StudentVolunteerRequest


router = APIRouter()


@router.post("/me", response_model=ParticipantResponse, status_code=status.HTTP_201_CREATED)
async def create_participant(
    participant: ParticipantCreateRequest,
    current_user: BaseUser = Depends(deps.get_current_user),
    session: AsyncSession = Depends(deps.get_session),
):
    """Create a new participant"""
    participant = Participant(
        id=current_user.id,
        university=participant.university,
    )
    session.add(participant)
    await session.commit()
    return participant


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
    return participant


# ----------------- Restricted -----------------
