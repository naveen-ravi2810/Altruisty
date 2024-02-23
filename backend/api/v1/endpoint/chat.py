from fastapi import APIRouter, Depends
from Schema.chat_schema import Chat
from ai.chat import bot_response
from core.security import validate_authenticated_user_token


router = APIRouter()


@router.post('/chat')
def lets_chat(chat:Chat, token:int = Depends(validate_authenticated_user_token)):
    response = bot_response(chat.chat_query)
    return {'resp':response}
