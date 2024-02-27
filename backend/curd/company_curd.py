from sqlmodel import Session, select
from Models.company_model import CompanyCreate, Company
from fastapi import HTTPException, UploadFile
from Models.user_model import User
from utils.s3 import upload_company_photo_to_s3


def create_company_by_user_id(session: Session, company_details: CompanyCreate, user_id: int) -> Company:
    try:
        company = Company(**company_details, own_id=user_id)
        session.add(company)
        session.commit()
        session.refresh(company)
        return company
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

def update_profile_by_id(user_id:int, session:Session, profile:UploadFile):
    try:
        statement = select(Company).where(Company.own_id==user_id)
        company = session.exec(statement).one()
        company.logo_url = upload_company_photo_to_s3(file=profile, company_id=company.id)
        session.add(company)
        session.commit()
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
def get_company_by_user_id(user_id: int, session: Session):
    try:
        statement = select(Company).where(Company.own_id==user_id)
        company = session.exec(statement).one_or_none()
        return company
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

