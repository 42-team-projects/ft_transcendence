from .models import User
from django.conf import settings
from rest_framework.decorators import api_view
from django_ratelimit.decorators import ratelimit
from .utils import gen_email_token, send_reset_email
from rest_framework.response import Response
from rest_framework import status
import jwt

@api_view(['POST'])
# @ratelimit(key='ip', rate='1/d', block=True)
def reset_password(req):
    email = req.data.get('email')

    try:
        user = User.objects.get(email=email)
        reset_token = gen_email_token(user, minutes=15)
        send_reset_email(user, req, reset_token)
    
        return Response({'message': 'Reset token sent via email.'})
    except User.DoesNotExist:
        return Response({
            'message': 'The provided email does not exist in our records.'
            }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
# @ratelimit(key='ip', rate='1/d', block=True)
def verify_token(req, token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        email = payload['email']

        User.objects.get(email=email)
        return Response({'message': 'Token is valid'}, status=status.HTTP_200_OK)

    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
# @ratelimit(key='ip', rate='1/d', block=True)
def confirm_reset_password(req, token):
    new_password = req.data.get('new_password')

    # print('----> here 0 <----')
    if not new_password:
        return Response({'message': 'New password is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        # print('----> ', payload)
        email = payload['email']

        user = User.objects.get(email=email)
        user.set_password(new_password)
        user.save()
        return Response({'message': 'changed.'})

    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, User.DoesNotExist):
        return Response({'message': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)