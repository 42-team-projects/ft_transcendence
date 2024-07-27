from django.urls import path

from .consumers import GameConsumer

ws_urlpatterns = [
    path('ws/game/', GameConsumer.as_asgi())
]
