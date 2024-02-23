from fastapi import APIRouter, Body, Depends
from Schema.test_schema import TestBase
from utils.question import check_value 
from core.security import validate_authenticated_user_token
from curd.user_curd import update_login_status_of_user
from core.db import get_session
from sqlmodel import Session
from curd.test_curd import update_test_by_student_id


router = APIRouter()


@router.post('/test')
def get_status_of_idea(answers:dict, token_id:int = Depends(validate_authenticated_user_token), session:Session=Depends(get_session)):
    value = check_value(answers)
    user = update_login_status_of_user(id=token_id, session=session)
    update_test_by_student_id(user=user, session=session, score=value)
    return {'get_status':value}
