from fastapi import APIRouter, Depends
from sqlmodel import Session
from core.security import validate_authenticated_user_token
from core.db import get_session
from curd.tasks_curd import get_next_task_of_the_current_user, get_task_of_the_current_user


router = APIRouter()

@router.get('/tasks')
def get_tasks(user_id:int=Depends(validate_authenticated_user_token), session:Session = Depends(get_session)):
    tasks = get_task_of_the_current_user(user_id=user_id, session=session)
    return tasks

@router.put('/tasks')
def update_tasks(user_id:int=Depends(validate_authenticated_user_token), session:Session = Depends(get_session)):
    tasks = get_next_task_of_the_current_user(user_id=user_id, session=session)
    return tasks