from fastapi import APIRouter, Depends, status
from core.db import get_session
from sqlmodel  import Session
from core.security import validate_authenticated_user_token
from curd.email_curd import send_otp_to_email, verify_email_otp


router = APIRouter()

@router.get("/verifyemail")
def verify_email(otp:int, session: Session = Depends(get_session), token_id: int = Depends(validate_authenticated_user_token)):
    result = verify_email_otp(id=token_id, session=session, otp=otp)
    return result

@router.get("/sendotp", status_code=status.HTTP_200_OK)
def send_otp(session: Session = Depends(get_session), token_id: int = Depends(validate_authenticated_user_token)):
    result = send_otp_to_email(id=token_id, session=session)
    return {'status':True, 'email':result}