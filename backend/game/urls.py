from django.urls import path
from . import views

urlpatterns = [
    path('game_play/', views.getGamePlayOfTheCurrentUser, name="getGamePlayOfTheCurrentUser"),
    path('game_history/me/', views.getMyGameHistory, name="getMyGameHistory"),
    path('game_history/<str:username>/', views.getGameHistoryByUserName, name="getGameHistoryByUserName")
]
