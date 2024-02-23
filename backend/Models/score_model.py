from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime
from .user_model import User


class ScoreBase(SQLModel):
    score: float
    user_id: int = Field(foreign_key='user.id')



class Score(ScoreBase, table=True):
    id: int = Field(primary_key=True)
    test_date: datetime = Field(default_factory=datetime.utcnow)
    user : Optional[User] = Relationship(back_populates="scores")


class ScoreCreate(ScoreBase):
    pass