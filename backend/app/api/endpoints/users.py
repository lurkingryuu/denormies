from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api import deps
from app.models import User
from app.schemas.responses import UserResponse, UserMeResponse
from app.schemas.requests import UserUpdatePasswordRequest, BaseUser
from app.core.security import get_password_hash


router = APIRouter()


@router.get("/me", response_model=UserMeResponse)
async def read_current_user(
    current_user: BaseUser = Depends(deps.get_current_user),
    session: AsyncSession = Depends(deps.get_session),
):
    """Get current user"""
    result = await session.execute(select(User).where(User.id == current_user.id))
    user = result.scalars().first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserMeResponse(
        email=user.email, 
        phone=user.phone, name=user.name, role=user.role)


@router.post("/reset-password", response_model=UserResponse)
async def reset_current_user_password(
    user_update_password: UserUpdatePasswordRequest,
    session: AsyncSession = Depends(deps.get_session),
    current_user: BaseUser = Depends(deps.get_current_user),
):
    """Update current user password"""
    current_user.password = get_password_hash(user_update_password.password)
    session.add(current_user)
    await session.commit()
    return current_user


@router.delete("/me", status_code=204)
async def delete_current_user(
    current_user: BaseUser = Depends(deps.get_current_user),
    session: AsyncSession = Depends(deps.get_session),
):
    """Delete current user"""
    await session.execute(delete(User).where(User.id == current_user.id))
    await session.commit()
