"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter #new
from channels.auth import AuthMiddlewareStack #new
import tournament.routing #new
import chat.routing #dokoko
import notification.routing #dokoko
from game.routing import ws_urlpatterns #new


from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
# from channels.middleware import BaseMiddleware
# from channels.db import database_sync_to_async
# from django.contrib.auth.models import AnonymousUser
# from rest_framework_simplejwt.tokens import AccessToken
# from django.contrib.auth import get_user_model

# User = get_user_model()


# @database_sync_to_async
# def get_user_from_token(token):
#     try:
#         # Validate the token and get the user ID
#         access_token = AccessToken(token)
#         user_id = access_token['user_id']
#         return User.objects.get(id=user_id)
#     except Exception:
#         return AnonymousUser()

# class JWTAuthMiddleware(BaseMiddleware):
#     async def __call__(self, scope, receive, send):
#         headers = dict(scope['headers'])
#         authorization_header = headers.get(b'authorization', None)

#         if authorization_header:
#             try:
#                 auth_type, token = authorization_header.decode().split()
#                 if auth_type.lower() == 'bearer':
#                     scope['user'] = await get_user_from_token(token)
#             except Exception:
#                 scope['user'] = AnonymousUser()
#         else:
#             scope['user'] = AnonymousUser()

#         return await super().__call__(scope, receive, send)



application = ProtocolTypeRouter({
    'http' : get_asgi_application(),
    'websocket' : AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
            + notification.routing.websocket_urlpatterns
            + tournament.routing.websocket_urlpatterns
            + ws_urlpatterns
        )
    )
})
