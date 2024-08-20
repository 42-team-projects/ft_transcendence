from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
    # path('tournament/<int:tournament_id>/', consumers.TournamentConsumer.as_asgi()),
]

