from sqlmodel import Relationship, SQLModel, Field
from datetime import date, datetime


class CompanyBase(SQLModel):
    name: str 
    description: str
    company_type: str
    start_date: date = Field(lt=date.today())

class Company(CompanyBase, table=True):
    id: int = Field(primary_key=True)
    added_date: date = Field(default_factory=date.today)
    owner: "user" = Relationship(back_populates='companies')

class CompanyCreate(CompanyBase):
    pass
