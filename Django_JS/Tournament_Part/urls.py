# from django.urls import path
# from .import views

# # urlpatterns = [
# #     path('',views.index, name='index'),
# # ]

# tournament/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, PlayerViewSet, TournamentViewSet, TournamentPlayerViewSet

router = DefaultRouter()
router.register(r'games', GameViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'tournaments', TournamentViewSet)
router.register(r'tournament-players', TournamentPlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

