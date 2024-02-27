import boto3
from core.settings import settings
from fastapi import UploadFile


s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.aws_access_key,
    aws_secret_access_key=settings.aws_secret_key,
    region_name="us-east-1",
)



def upload_user_photo_to_s3(file: UploadFile, user_id: int):
    filename = str(user_id) + '.jpg'
    key = f"{settings.user_profile_bucket}/{filename}"
    s3_client.upload_fileobj(file.file, settings.aws_bucket_name, key)
    return f"https://{settings.aws_bucket_name}.s3.amazonaws.com/{key}"


def upload_company_photo_to_s3(file: UploadFile, company_id: int):
    filename = str(company_id) + '.jpg'
    key = f"{settings.company_profile_bucket}/{filename}"
    s3_client.upload_fileobj(file.file, settings.aws_bucket_name, key)
    return f"https://{settings.aws_bucket_name}.s3.amazonaws.com/{key}"
