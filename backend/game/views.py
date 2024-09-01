from django.shortcuts import render
from rest_framework import generics
from .models import Player
from .serializers import PlayerSerializer 
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.
from rest_framework.parsers import JSONParser
from django.http import HttpResponse, JsonResponse

class ListPlayer(generics.ListAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

class DetailsPlayer(generics.RetrieveAPIView):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

# @api_view(['POST'])
# def login(request):
#     # return id of player and username
#     username = request.data.get('username')
#     password = request.data.get('password')
#     player = Player.objects.filter(username=username, password=password).first()
#     if player:
#         return Response({'id': player.id})
#     else:
#         return Response({'error': 'Invalid username or password'})
    


# @csrf_exempt
@api_view(['POST'])
def login(request):
    # printRequest(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data.get('username')
        password = data.get('password')
        try:
            player = Player.objects.get(username=username, password=password)
            serializer = PlayerSerializer(player)
            return JsonResponse({'status': 'success', 'player': serializer.data}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Invalid email or password'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
