from fastapi import APIRouter, Depends
from sqlmodel import Session
from core.db import get_session
from core.security import validate_authenticated_user_token
from curd.password_curd import change_password_by_token
from Schema.password_schema import PasswordChange


router = APIRouter()


@router.put("/changepassword")
def change_password(password_details: PasswordChange, token_id: int = Depends(validate_authenticated_user_token), session: Session = Depends(get_session)):
    result = change_password_by_token(id=token_id, session=session, password_details=password_details)
    return result