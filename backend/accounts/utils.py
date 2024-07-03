from django.core.mail import send_mail, EmailMessage
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.conf import settings
from .models import User, OTP
from datetime import timedelta, datetime
import random
import six

class CustomTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active)
        )

custom_token_generator = CustomTokenGenerator()

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

def send_confirmation_email(user, request, token):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    current_site = get_current_site(request)
    
    mail_subject = 'Activate your account.'
    context = {
        'username': user.username,
        'domain': current_site.domain,
        'uid': uid,
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
