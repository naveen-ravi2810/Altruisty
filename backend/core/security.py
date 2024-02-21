from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, HTTPException
import jwt
from core.settings import settings
from Models.user_model import User
from datetime import datetime, timedelta

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
        return data['id']
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"UnAuthorized")
