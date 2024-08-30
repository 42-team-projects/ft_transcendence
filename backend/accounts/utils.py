from datetime import timedelta, datetime, timezone
from django.core.mail import EmailMessage
from django.conf import settings
import jwt

def gen_email_token(user, days = 0, minutes = 0):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.now(timezone.utc) + timedelta(days=days, minutes=minutes)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

def send_confirmation_email(user, request, token):
    mail_subject = 'Activate your account.'
    confirm_url = f'{settings.FRONTEND_BASE_URL}/confirm-email?token={token}'
    body = (
        f'Hi {user.username},<br><br>'
        f'Please confirm your new account by visiting <a href="{confirm_url}">{confirm_url}</a><br><br>'
        f'Thank you from ft_transcendence team!'
    )
    
    email = EmailMessage(
        mail_subject,
        body,
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    email.content_subtype = 'html'
    email.send(fail_silently=False)

def send_reset_email(user, request, reset_token):
    mail_subject = 'Password Reset'
    reset_url = f'http://127.0.0.1:3000/html/confirm-reset-password.html?token={ reset_token }'
    body = f'Click the link below to reset your password:<br><a href="{reset_url}">{reset_url}</a>'

    email = EmailMessage(
        mail_subject,
        body,
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    email.content_subtype = 'html'
    email.send(fail_silently=False)