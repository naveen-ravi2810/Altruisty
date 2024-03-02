from sqlmodel import SQLModel, Field


class TaskBase(SQLModel):
    task_id: int = Field(primary_key=True)
    user_id: int = Field(foreign_key='user.id')
    stage: int
    
