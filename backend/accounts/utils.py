from datetime import timedelta, datetime, timezone
from django.core.mail import EmailMessage
from django.conf import settings
import random, jwt, os

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
    reset_url = f'{settings.FRONTEND_BASE_URL}/confirm-password?token={reset_token}'
    body = f'Click the link below to reset your password:<br><a href="{reset_url}">{reset_url}</a>'

    email = EmailMessage(
        mail_subject,
        body,
        settings.EMAIL_HOST_USER,
        [user.email],
    )
    email.content_subtype = 'html'
    email.send(fail_silently=False)

def get_default_avatar():
    avatar_folder = 'media/defaults'
    return 'defaults/' + random.choice(os.listdir(avatar_folder))

def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip