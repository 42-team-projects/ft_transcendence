from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('tournament/<int:tournament_id>/', consumers.TournamentConsumer.as_asgi()),
]