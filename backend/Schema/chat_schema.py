from pydantic import BaseModel


class Chat(BaseModel):
    chat_query: str
    