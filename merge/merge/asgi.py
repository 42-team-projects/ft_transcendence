"""
ASGI config for merge project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter, URLRouter #new
from channels.auth import AuthMiddlewareStack #new
# from chat.routing import websocket_urlpatterns #new
import chat.routing #new
import tournament.routing #new
# from channels.layers import get_channel_layer #new

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'merge.settings')

# application = get_asgi_application()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns +
            tournament.routing.websocket_urlpatterns
        )
    ),
})

# channel_layer = get_channel_layer() #new