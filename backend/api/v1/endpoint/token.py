from fastapi import APIRouter, Depends
from core.security import validate_authenticated_user_token

router = APIRouter()

@router.get("/token")
def check_token(token_id:int = Depends(validate_authenticated_user_token)):
    return {'status':True}