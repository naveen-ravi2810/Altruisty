from fastapi import APIRouter, Depends, UploadFile
from fastapi.encoders import jsonable_encoder
from core.db import get_session
from Models.user_model import UserCreate, UserLogin, UserRead
from curd.user_curd import create_user, authenticate_user, get_profile_by_id, remove_token_from_redis, update_profile_by_id
from sqlmodel  import Session
from core.security import validate_authenticated_user_token, get_token_details


router = APIRouter()


@router.post("/register")
def register_user(user_details: UserCreate, session:Session = Depends(get_session)):
    return {'status':create_user(session=session, user_details=jsonable_encoder(user_details)) }
    

@router.post("/login")
def login_user(user_details: UserLogin, session: Session = Depends(get_session)):
    token, is_login_first = authenticate_user(session=session, user_details=user_details)
    return {'status':True, 'access_token': token, 'is_first_login':is_login_first}
    

@router.get("/profile", response_model=UserRead)
def get_profile(token_id:int = Depends(validate_authenticated_user_token), session: Session = Depends(get_session)):
    return get_profile_by_id(id=token_id, session=session)


@router.put("/updateprofile")
def update_profile(profile: UploadFile, token_id: int = Depends(validate_authenticated_user_token), session: Session = Depends(get_session)):
    return update_profile_by_id(user_id=token_id, session=session, profile=profile)


@router.delete("/logout")
def logout_user(token_id:dict = Depends(validate_authenticated_user_token)):
    return remove_token_from_redis(token_id)
    