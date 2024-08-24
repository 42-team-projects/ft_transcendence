from django.core.mail import EmailMessage
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.conf import settings
from .models import User, OTP
from datetime import timedelta, datetime, timezone
import random
import jwt

def send_otp(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        user = User.objects.get(email=email)
        otp_code = random.randint(100000, 999999)
        
        subject = 'OTP Verification'
        body = f"""
        Hello {user.username},

        Your OTP is {otp_code}

        Thank you,
        Your Team
        """
        message = EmailMessage(
            subject,
            body,
            settings.EMAIL_HOST_USER,
            [email],
        )
        OTP.objects.create(user=user, otp=otp_code)
        # not raise an exception
        message.send(fail_silently=True)

def gen_email_token(user, days = 0, minutes = 0):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.now(timezone.utc) + timedelta(days=days, minutes=minutes)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

def send_confirmation_email(user, request, token):
    current_site = get_current_site(request)
    
    mail_subject = 'Activate your account.'
    context = {
        'username': user.username,
        'domain': current_site.domain,
        'token': token,
    }
    body = render_to_string('mail.html', context)
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