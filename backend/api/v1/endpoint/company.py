from fastapi import APIRouter, Depends, UploadFile
from Models.company_model import CompanyCreate
from core.security import validate_authenticated_user_token
from curd.company_curd import create_company_by_user_id, update_profile_by_id, get_company_by_user_id
from sqlmodel import Session
from core.db import get_session
from fastapi.encoders import jsonable_encoder


router = APIRouter()


@router.post("/register_company")
def regist_company(comapany_details: CompanyCreate, token:int = Depends(validate_authenticated_user_token), session:Session = Depends(get_session)):
    result = create_company_by_user_id(session=session, company_details=jsonable_encoder(comapany_details), user_id=token)
    print(result)
    return result


@router.put("/update_company_profile")
def update_profile(profile: UploadFile, token_id: int = Depends(validate_authenticated_user_token), session: Session = Depends(get_session)):
    return update_profile_by_id(user_id=token_id, session=session, profile=profile)


@router.get("/company")
def get_company(token_id: int = Depends(validate_authenticated_user_token), session: Session = Depends(get_session)):
    return get_company_by_user_id(user_id=token_id, session=session)