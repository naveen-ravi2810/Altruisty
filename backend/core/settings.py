from pydantic_settings import BaseSettings
import os
from dotenv import load_dotenv
from functools import lru_cache
load_dotenv()


class Settings(BaseSettings):
    app_title:str = "ALTRUISTY"
    app_description:str = "This is for a versioning Startups"
    api_endpoint: str = '/api/v1'

    db_uri: str = os.getenv('sql_uri')
    # redis_host: str = os.getenv('redis_host')
    # redis_port: str = os.getenv('redis_port')
    # redis_db: int = os.getenv('redis_db')

    jwt_key:str = "sffjbnfoibeiobf"
    jwt_algorithm:str = "HS256"

    otp_digits: int = 1000000


    smtp_email: str = os.getenv("smtp_email")
    smtp_password: str = os.getenv("smtp_password")

    aws_access_key: str = os.getenv("aws_access_key")
    aws_secret_key: str = os.getenv("aws_secret_key")
    aws_bucket_name: str = os.getenv("buker_name", 'altruisty')
    user_profile_bucket: str = os.getenv('user_profile_bucket','user_profile')
    company_profile_bucket: str = os.getenv('company_profile_bucket','Company_profile')

settings = Settings()
