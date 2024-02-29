from pydantic import BaseModel, EmailStr, Field, validator


class BaseRequest(BaseModel):
    # may define additional fields or config shared across requests
    pass


class UserUpdatePasswordRequest(BaseRequest):
    password: str


class UserCreateRequest(BaseRequest):
    email: EmailStr
    password: str
    phone: str = None
    name: str
    role: str

    @validator("phone")
    def phone_must_be_valid(cls, v):
        if v is not None and len(v) < 10:
            raise ValueError("Phone number must be at least 10 digits")
        return v


class UserLoginRequest(BaseRequest):
    email: EmailStr
    password: str


class BaseUser(BaseModel):
    id: str
    email: EmailStr
    phone: str
    role: str
    password: str
    name: str
