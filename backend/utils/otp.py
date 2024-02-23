from uuid import uuid4
from core.settings import settings


def get_six_digit_otp():
    return uuid4().int % settings.otp_digits