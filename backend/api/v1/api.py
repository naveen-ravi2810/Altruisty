from fastapi import APIRouter 
from api.v1.endpoint.user import router as user_router
from api.v1.endpoint.token import router as token_router


api = APIRouter()

api.include_router(user_router, tags=["CURD USERS"])
api.include_router(token_router, tags=["Token"])