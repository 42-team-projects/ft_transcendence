from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('tournament/<int:tournament_id>/', consumers.TournamentConsumer.as_asgi()),
    path('tournament/sync/<str:tournament_name>/', consumers.TournamentDataSyncConsumer.as_asgi()),
]