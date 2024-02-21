from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv
from functools import lru_cache
load_dotenv()


class Settings(BaseSettings):
    app_title:str = "ALTRUISTY"
    app_description:str = "This is for a versioning Startups"
    db_uri: str = os.getenv('sql_uri')

    jwt_key:str = "sffjbnfoibeiobf"
    jwt_algorithm:str = "HS256"


settings = Settings()
