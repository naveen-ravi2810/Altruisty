from typing import List, Optional
from sqlmodel import Relationship, SQLModel, Field
from datetime import date, datetime
from .user_model import User


class CompanyBase(SQLModel):
    name: str = Field(unique=True, index=True)
    description: str
    company_type: str
    start_date: date
    prototype_description: str
    idea: str = Field(min_length=300)


class Company(CompanyBase, table=True):
    id: int = Field(primary_key=True)
    logo_url : str = Field(default="")
    added_date: date = Field(default_factory=date.today)
    own_id: int = Field(foreign_key='user.id', unique=True)
    owner: Optional[User] = Relationship(back_populates='companies')


class CompanyCreate(CompanyBase):
    """
        name: str 
        description: str
        company_type: str
        start_date: date = Field(lt=date.today())
        prototype_description: str
        idea: str = Field(min_length=300)
    """
    pass
