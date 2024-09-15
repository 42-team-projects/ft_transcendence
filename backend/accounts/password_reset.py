from .models import User
from django.conf import settings
from rest_framework.decorators import api_view
from .utils import gen_email_token, send_reset_email, get_client_ip
from rest_framework.response import Response
from rest_framework import status
import jwt
from django.core.cache import cache
from datetime import datetime, timedelta


@api_view(['POST'])
def reset_password(req):
    email = req.data.get('email')
    ip = get_client_ip(req)

    last_request = cache.get(ip)
    if last_request and datetime.now() - last_request < timedelta(minutes=15):
        return Response({
            'message': 'Your reset token is still valid. Please check your email.'
        }, status=status.HTTP_429_TOO_MANY_REQUESTS)


    try:
        user = User.objects.get(email=email)
        if user.auth_provider != 'email':
            return Response({
                'message': 'Only email authenticated users can reset their password.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.is_verified:
            return Response({
                'message': 'Only verified users can reset their password.'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        reset_token = gen_email_token(user, minutes=15)
        send_reset_email(user, req, reset_token) 
        # 900 seconds = 15 minutes 
        cache.set(ip, datetime.now(), 900)
    
        return Response({'message': 'Please check your email to reset your password.'})
    except User.DoesNotExist:
        return Response({
            'message': 'User with this email does not exist.'
            }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def verify_token(req, token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        email = payload['email']

        User.objects.get(email=email)
        return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)

    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def confirm_reset_password(req, token):
    new_password = req.data.get('new_password')

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        email = payload['email']

        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password reset successful'}, status=status.HTTP_200_OK)

    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)