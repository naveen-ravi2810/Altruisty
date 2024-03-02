from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, HTTPException
import jwt
from core.settings import settings
from Models.user_model import User
from datetime import datetime, timedelta
from core.db import r_conn

auth_scheme = HTTPBearer()

def create_access_token(user: User):
    curr_time = datetime.utcnow()
    return jwt.encode(payload={'id':user.id, 'email':user.email, 'iat':curr_time, 'exp':curr_time+timedelta(hours=24)}, key=settings.jwt_key, algorithm=settings.jwt_algorithm)

def decode_jwt(token):
    try:
        data = jwt.decode(jwt=token, key=settings.jwt_key, algorithms=settings.jwt_algorithm)
        return data
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"UnAuthorized")
    

async def validate_authenticated_user_token(token: HTTPAuthorizationCredentials = Depends(auth_scheme)) -> int:
    try:
        data = decode_jwt(token.credentials)
        r_token = r_conn.get(name=f"access_token:{data['id']}")
        if r_token:
            exist_token = r_token.decode('utf-8')
            if exist_token == token.credentials:
                return data['id']
            raise ValueError("Old/ Invalid Token")
        else:
            raise ValueError("Expired Token")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"{e}")
    
async def get_token_details(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    try:
        data = decode_jwt(token.credentials)
        exist_token = r_conn.get(name=f"access_token:{data['id']}").decode('utf-8')
        if exist_token == token.credentials:
            return data
        raise ValueError("Old/ Invalid Token")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"{e}")
    