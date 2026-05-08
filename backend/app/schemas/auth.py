from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class TokenPayload(BaseModel):
    sub: str
    email: EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    organization: str
    role: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    organization_id: int

    class Config:
        from_attributes = True
