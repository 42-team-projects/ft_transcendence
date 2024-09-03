from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework import status
from .models import User
import requests
from django.conf import settings
from django.core.files.base import ContentFile
from Player.PlayersManager import createNewPlayer
from urllib.parse import urlencode

def redirect_error(error_message):
    url = f"{settings.FRONTEND_BASE_URL}/oauth?{urlencode({'error': error_message})}"
    return HttpResponseRedirect(url)


def register_social_user(provider, email, username, avatar_url=None):
    user = User.objects.filter(email=email).first()

    if not user:
        user = User.objects.create(email=email, username=username, avatar=avatar_url)
        user.auth_provider = provider
        user.is_verified = True
        user.set_unusable_password()

        if avatar_url:
            response = requests.get(avatar_url)
            image_content = ContentFile(response.content)
            filename = f"{username}.jpg"
            user.avatar.save(filename, image_content, save=False)

        user.save()
        createNewPlayer(user)
    else:
        if provider != user.auth_provider:
            return {
                # 'error': f'You originally registered with {user.auth_provider}. Please continue your login with {user.auth_provider}.'
                'error': f'Use {user.auth_provider} for login.'
            }

    tokens = user.tokens
    return {
        'email': user.email,
        'username': user.username,
        'avatar': user.avatar,
        'access_token': tokens['access_token'],
        'refresh_token': tokens['refresh_token'],
    }

@api_view(['GET'])
def redirect_to_provider(request, provider):
    conf = settings.OAUTH_PROVIDERS.get(provider.upper())
    if not conf:
        # return Response({'error': f'Unknown provider: {provider}'}, status=status.HTTP_400_BAD_REQUEST)
        return redirect_error(f'Unknown provider: {provider}')


    url = conf['AUTHORIZE_URL']
    params = {
        "client_id": conf['CLIENT_ID'],
        "redirect_uri": conf['REDIRECT_URI'],
        "response_type": "code",
        "scope": conf['SCOPE'],
        "prompt": "consent",
    }
    return redirect(requests.Request('GET', url, params=params).prepare().url)


@api_view(['GET'])
def oauth_callback(request, provider):
    conf = settings.OAUTH_PROVIDERS.get(provider.upper())
    if not conf:
        # return Response({'error': f'Unknown provider: {provider}'}, status=status.HTTP_400_BAD_REQUEST)
        return redirect_error(f'Unknown provider: {provider}')

    code = request.GET.get('code')
    if code is None:
        # return Response({'error': 'No code provided'}, status=status.HTTP_400_BAD_REQUEST)
        return redirect_error('No code provided')
    
    url = conf['TOKEN_URL']
    data = {
        "grant_type": "authorization_code",
        "client_id": conf['CLIENT_ID'],
        "client_secret": conf['CLIENT_SECRET'],
        "code": code,
        "redirect_uri": conf['REDIRECT_URI'],
    }
    
    response = requests.post(url, data=data)
    response_data = response.json()
    if response.status_code != 200:
        # return Response({'error': 'Failed to exchange code for token'}, status=status.HTTP_400_BAD_REQUEST)
        return redirect_error('Failed to exchange code for token')

    access_token = response_data.get('access_token')

    headers = {'Authorization': 'Bearer ' + access_token}
    response = requests.get(conf['USER_INFO_URL'], headers=headers)
    user_data = response.json()
    user_id_field = conf['USER_ID_FIELD']

    # new
    if provider.lower() == 'google':
        avatar_url = user_data.get('picture')
    elif provider.lower() == 'intra':
        avatar_url = user_data.get('image', {}).get('versions', {}).get('large')
    else:
        avatar_url = None

    result = register_social_user(provider, user_data['email'], user_data[user_id_field], avatar_url)
    if 'error' in result:
        return redirect_error(result['error'])

    response = HttpResponseRedirect(f'{settings.FRONTEND_BASE_URL}/oauth?access_token={result["access_token"]}')
    response.set_cookie('refresh_token', result['refresh_token'], httponly=True, samesite='None', secure=True)
    return response
