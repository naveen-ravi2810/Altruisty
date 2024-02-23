from pydantic import BaseModel


class TestBase(BaseModel):
    answers: dict
