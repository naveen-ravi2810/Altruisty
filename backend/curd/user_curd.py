from core.db import r_conn
from Models.user_model import UserCreate, User, UserLogin
from sqlmodel import Session, select
import bcrypt
from core.security import create_access_token
from fastapi import HTTPException, UploadFile
from core.db import r_conn
from utils.s3 import upload_user_photo_to_s3

def create_user(user_details:UserCreate, session:Session):
    try:
        user = User(**user_details)
        user.password = bcrypt.hashpw(user_details['password'].encode('utf-8'), bcrypt.gensalt()).decode("utf-8")
        session.add(user)
        session.commit()
        session.refresh(user)
        return True
    except Exception as e:
        print(e)
        raise HTTPException(status_code=409, detail="Email/Phone Number Register again")
    

def authenticate_user(user_details:UserLogin, session:Session):
    try:
        statement = select(User).where(User.email == user_details.email)
        result = session.exec(statement).one()
        if bcrypt.checkpw(user_details.password.encode('utf-8'), result.password.encode('utf-8')):
            token = create_access_token(user=result)
            r_conn.setex(name=f"access_token:{result.id}", value=token, time=24*60*60) 
            return token, result.is_first_login
        raise HTTPException(status_code=401, detail="Invalid UserName/Password")
    except Exception as e:
        raise  HTTPException(status_code=401, detail="Invalid UserName/Password")


def get_profile_by_id(id: int, session: Session):
    try:
        statement = select(User).where(User.id == id)
        result = session.exec(statement).one()
        return result
    except:
        raise HTTPException(status_code=404, detail=f"No user Found")
    
def update_login_status_of_user(id: int, session: Session):
    try:
        statement = select(User).where(User.id == id)
        user = session.exec(statement).one()
        user.is_first_login = False
        session.add(user)
        session.commit()
        return user
    except:
        raise HTTPException(status_code=400, detail="User details cant updated")


def remove_token_from_redis(user_id: int):
    try:
        r_conn.delete(f'access_token:{user_id}')
    except:
        raise HTTPException(status_code=401, detail="Token Undefined")


def update_profile_by_id(user_id:int, session:Session, profile:UploadFile):
    try:
        statement = select(User).where(User.id==user_id)
        user = session.exec(statement).one()
        print("hi")
        user.profile_photo = upload_user_photo_to_s3(user_id=user_id, file=profile)
        session.add(user)
        session.commit()
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
