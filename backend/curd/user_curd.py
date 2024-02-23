from core.db import r_conn
from Models.user_model import UserCreate, User, UserLogin
from sqlmodel import Session, select
import bcrypt
from core.security import create_access_token
from fastapi import HTTPException

def create_user(user_details:UserCreate, session:Session):
    try:
        user = User(**user_details)
        user.password = bcrypt.hashpw(user_details['password'].encode('utf-8'), bcrypt.gensalt()).decode("utf-8")
        session.add(user)
        session.commit()
        return user
    except Exception as e:
        print(e)
        raise HTTPException(status_code=409, detail="Email/Phone Number Register again")
    

def authenticate_user(user_details:UserLogin, session:Session):
    try:
        statement = select(User).where(User.email == user_details.email)
        result = session.exec(statement).one()
        if bcrypt.checkpw(user_details.password.encode('utf-8'), result.password.encode('utf-8')):
            token = create_access_token(user=result)
            r_conn.setex(name=f"access_token:{result.email}", value=token, time=24*60*60) 
            return token
        raise HTTPException(status_code=401, detail="Invalid UserName/Password")
    except Exception as e:
        raise  HTTPException(status_code=401, detail="Invalid UserName/Password")


def get_profile_by_id(id: int, session: Session):
    try:
        statement = select(User).where(User.id == id)
        return session.exec(statement).one()
    except:
        raise HTTPException(status_code=404, detail=f"No user Found")
