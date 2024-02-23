import smtplib
from validate_email import validate_email
from core.settings import settings

def email_generater(email_id, otp):
    sender_email = settings.smtp_email
    sender_password = settings.smtp_password
    receiver_email = email_id
    message_text = f"The OTP is {otp}"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, sender_password)
    if validate_email(receiver_email):
        server.sendmail(sender_email, receiver_email, message_text)
        return True
    else:
        return False