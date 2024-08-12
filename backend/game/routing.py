from django.urls import path

from .consumers import GameConsumer

ws_urlpatterns = [
    path("ws/game/<str:id>/", GameConsumer.as_asgi()),
]
