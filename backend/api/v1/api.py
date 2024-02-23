from fastapi import APIRouter 
from api.v1.endpoint.user import router as user_router
from api.v1.endpoint.token import router as token_router
from api.v1.endpoint.password import router as password_router
from api.v1.endpoint.email import router as email_router
from api.v1.endpoint.chat import router as chat_router
from api.v1.endpoint.test import router as test_router


api = APIRouter()

api.include_router(user_router, tags=["Users"])
api.include_router(token_router, tags=["Token"])
api.include_router(password_router, tags=["Password"])
api.include_router(email_router, tags=["email"])
api.include_router(chat_router, tags=["chat"])
api.include_router(test_router, tags=["test"])
