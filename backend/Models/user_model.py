from sqlmodel import SQLModel, Field
from datetime import datetime


class UserBase(SQLModel):
    email: str = Field(nullable=False, unique=True)
    password : str = Field(nullable=False)



class UserCreate(UserBase):
    user_name : str  = Field(nullable=False)
    phone: int = Field(nullable=False, unique=True)
    

class User(UserCreate, table=True):
    id: int = Field(primary_key=True)
    email_verified: bool = Field(default=False)
    phone_verified: bool = Field(default=False)
    signed_up: datetime = Field(default_factory=datetime.utcnow)
    initial_score: float = Field(default=0)

class UserLogin(UserBase):
    pass


class UserRead(SQLModel):
    id:int
    email: str
    email_verified: bool
    phone_verified: bool
    signed_up: datetime
    initial_score: float
    user_name : str
    phone: int
    
