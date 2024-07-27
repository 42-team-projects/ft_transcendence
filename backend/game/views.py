from django.shortcuts import render
from rest_framework import generics
from .models import Player
from .serializers import PlayerSerialaizer 
from rest_framework.decorators import api_view

# Create your views here.

class ListPlayer(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerialaizer

class DetailsPlayer(generics.RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerialaizer