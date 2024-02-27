from fastapi import APIRouter, Depends
from core.security import get_token_details


router = APIRouter()

@router.get("/token")
def check_token(token:int = Depends(get_token_details)):
    return {'status':token}