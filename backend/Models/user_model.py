from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import List


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
    scores : List["Score"] = Relationship(back_populates="user")
    companies: "Company" = Relationship(back_populates="owner")

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
    
