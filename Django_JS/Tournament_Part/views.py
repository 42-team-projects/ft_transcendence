from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

# def index(request):
#     return (HttpResponse("Teeeeest"))


from rest_framework import viewsets
from .models import Game, Player, Tournament, TournamentPlayer
from .serializers import GameSerializer, PlayerSerializer, TournamentSerializer, TournamentPlayerSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TournamentPlayerViewSet(viewsets.ModelViewSet):
    queryset = TournamentPlayer.objects.all()
    serializer_class = TournamentPlayerSerializer