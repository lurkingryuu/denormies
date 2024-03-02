from pydantic import BaseModel, ConfigDict, EmailStr
from typing import List
import datetime

class BaseResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class AccessTokenResponse(BaseResponse):
    token_type: str
    access_token: str
    expires_at: int
    issued_at: int
    refresh_token: str
    refresh_token_expires_at: int
    refresh_token_issued_at: int


# ----------------- Users -----------------
class UserResponse(BaseResponse):
    status: str
    token: str


class UserMeResponse(BaseResponse):
    email: EmailStr
    phone: str
    name: str
    role: str

class UserListResponse(BaseResponse):
    users: List[UserMeResponse]

# ----------------- Events -----------------
class EventSchema(BaseResponse):
    id: str
    name: str
    type: str
    desc: str
    date: datetime.datetime
    duration: datetime.timedelta
    venue: str

class MiniEventSchema(BaseResponse):
    id: str
    name: str
    type: str
    date: datetime.datetime


class EventListResponse(BaseResponse):
    events: List[MiniEventSchema]


# ----------------- Schedule -----------------