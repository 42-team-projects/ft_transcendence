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

# application = get_asgi_application()

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
