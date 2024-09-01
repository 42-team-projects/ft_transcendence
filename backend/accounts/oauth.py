from django.shortcuts import redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework import status
from .models import User
import requests
from django.conf import settings

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

@api_view(['GET'])
def redirect_to_provider(request, provider):
	conf = settings.OAUTH_PROVIDERS.get(provider.upper())
	if not conf:
		return Response({'error': f'Unknown provider: {provider}'}, status=status.HTTP_400_BAD_REQUEST)

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
		return Response({'error': f'Unknown provider: {provider}'}, status=status.HTTP_400_BAD_REQUEST)

	code = request.GET.get('code')
	if code is None:
		return Response({'error': 'No code provided'}, status=status.HTTP_400_BAD_REQUEST)
	
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
		return Response({'error': 'Failed to exchange code for token'}, status=status.HTTP_400_BAD_REQUEST)

	access_token = response_data.get('access_token')

	headers = {'Authorization': 'Bearer ' + access_token}
	response = requests.get(conf['USER_INFO_URL'], headers=headers)
	user_data = response.json()
	user_id_field = conf['USER_ID_FIELD']
	result = register_social_user(provider, user_data['email'], user_data[user_id_field])
	
	response = HttpResponseRedirect(f'http://127.0.0.1:3000/oauth?access_token={result["access_token"]}')
	response.set_cookie('refresh_token', result['refresh_token'], httponly=True)
	return response