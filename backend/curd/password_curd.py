from sqlmodel import Session, select 
from Schema.password_schema import PasswordChange
from Models.user_model import User
import bcrypt
from fastapi import HTTPException

def change_password_by_token(session:Session, id:int, password_details:PasswordChange):
    try:
        statement = select(User).where(User.id == id)
        result = session.exec(statement).one()
        if bcrypt.checkpw(password_details.old_password.encode('utf-8'), result.password.encode('utf-8')):
            result.password = bcrypt.hashpw(password_details.new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            session.add(result)
            session.commit()
            return True
        raise ValueError('Invalid Old Password')
    except Exception as e:
        raise HTTPException(status_code=400, detail={'status':False, 'message':f'{e}'})