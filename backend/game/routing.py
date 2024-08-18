from django.urls import path

from .consumers import GameConsumer, MatchMaikingConsumer

ws_urlpatterns = [
    path("ws/matchmaking/<str:id>/", MatchMaikingConsumer.as_asgi()),
    path("ws/game/<str:room_name>/", GameConsumer.as_asgi())
]
