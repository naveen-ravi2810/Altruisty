from fastapi import APIRouter 
from api.v1.endpoint.user import router as user_router


api = APIRouter()

api.include_router(user_router)
