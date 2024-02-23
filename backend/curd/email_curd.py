from sqlmodel import Session, select
from core.db import r_conn
from Models.user_model import User
from utils.otp import get_six_digit_otp
from utils.email import email_generater
from fastapi import HTTPException
from datetime import timedelta


def send_otp_to_email(id: int, session: Session):
    statement = select(User).where(User.id==id).where(User.email_verified==False)
    result = session.exec(statement).one_or_none()
    if result:
        otp = get_six_digit_otp()
        if email_generater(email_id = result.email, otp = otp):
            r_conn.setex(name=f"{result.email}:otp", value=otp, time=timedelta(days=1))
            return result.email
        raise HTTPException(status_code=400, detail="Invalid Email")
    raise HTTPException(status_code=409, detail="Email Already Verified")

def verify_email_otp(id: int, session: Session, otp: int):
    statement = select(User).where(User.id==id).where(User.email_verified==False)
    result = session.exec(statement).one_or_none()
    if result:
        original_otp = r_conn.get(f"{result.email}:otp").decode('utf-8')
        if int(original_otp) == otp:
            result.email_verified = True
            session.add(result)
            session.commit()
            r_conn.delete(f"{result.email}:otp")
            return True
    raise HTTPException(status_code=409, detail="Email Already Verified")
        