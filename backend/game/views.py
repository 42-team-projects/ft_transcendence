from django.shortcuts import render
from rest_framework import generics
from .models import Player
from .serializers import PlayerSerialaizer 
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

class ListPlayer(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerialaizer

class DetailsPlayer(generics.RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerialaizer

@api_view(['POST'])
def login(request):
    # return id of player and username
    username = request.data.get('username')
    password = request.data.get('password')
    player = Player.objects.filter(username=username, password=password).first()
    if player:
        return Response({'id': player.id})
    else:
        return Response({'error': 'Invalid username or password'})
    
