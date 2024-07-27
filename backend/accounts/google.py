from .models import User
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import redirect as tttt
import requests

# This function validates the Google access token by sending
# a GET request to Google's tokeninfo endpoint.
class Google():
    @staticmethod
    def validate(access_token):
        try:
            response = requests.get(f'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}')
            if response.status_code == 200:
                # print ("Token validation successful (Google validate)")
                return response.json()
            else:
                return 'token is invalid or has expired'
        except Exception as e:
            # print("e===> ", e)
            return 'token is invalid or has expired'

def register_social_user(provider, email, username):
    user = User.objects.filter(email=email).first()

    if not user:
        user = User.objects.create(email=email, username=username)
        user.auth_provider = provider
        user.is_verified = True
        user.set_unusable_password()
        user.save()
    else:
        if provider != user.auth_provider:
            return {
                'message': f'You originally registered with {user.auth_provider}. Please continue your login with {user.auth_provider}.'
            }

    tokens = user.tokens
    return {
        'email': user.email,
        'username': user.username,
        'access_token': tokens['access_token'],
        'refresh_token': tokens['refresh_token'],
    }

def exchange_code_for_token(code):
    data = {
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'redirect_uri': 'http://127.0.0.1:8000/api/v1/auth/google/redirect',
        'grant_type': 'authorization_code'
    }

    response = requests.post('https://oauth2.googleapis.com/token', data=data)

    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception('Failed to exchange code for token')


@api_view(['GET'])
def redirect(request):
    code = request.GET.get('code')
    print("<---- code ---->")
    print(code)
    print("<-------------->")

    if code is None:
        return Response({'error': 'No code provided'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Exchange the authorization code for an access token
        token = exchange_code_for_token(code)
        return tttt(f'http://127.0.0.1:3000?token={token}')
        # return JsonResponse({'access_token': token})
    except Exception as e:
        return Response({'error': 'Failed to authenticate'}, status=status.HTTP_400_BAD_REQUEST)