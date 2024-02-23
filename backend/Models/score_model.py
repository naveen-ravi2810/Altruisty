from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from .user_model import User


class Score(SQLModel, table=True):
    id: int = Field(primary_key=True)
    test_date: datetime = Field(default_factory=datetime.utcnow)
    score: float
    user_id: int = Field(foreign_key='user.id')
    user : Optional[User] = Relationship(back_populates="scores")