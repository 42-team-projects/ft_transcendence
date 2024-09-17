
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .models import GamePlay, GameHestory
from .serializers import GamePlaySerializer , GameHestorySerializer
from Player.Models.PlayerModel import Player

@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getGamePlayOfTheCurrentUser(request):
    try:
        gameplay = GamePlay.objects.get(player__user=request.user)
    except GamePlay.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GamePlaySerializer(gameplay)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        data = request.data;
        serializer = GamePlaySerializer(gameplay, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, safe=False, status=status.HTTP_200_OK)
        
@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getMyGameHistory(request):
    if request.method == 'GET':
        gamehistory = GameHestory.objects.filter(player__user=request.user).order_by('-id')
        serializer = GameHestorySerializer(gamehistory, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        data = request.data
        try:
            player = Player.objects.get(user=request.user)
            opponent_player = Player.objects.get(id=data['opponent_player'])
            GameHestory.objects.create(player=player, player_score=data['player_score'], opponent_score=data['opponent_score'], result=data['result'], opponent_player=opponent_player)
            return JsonResponse({"response": "the history has been succefully created!!!"}, safe=False, status=status.HTTP_201_CREATED)
        except Player.DoesNotExist:
            return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

    
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGameHistoryByUserName(request, username):
    try:
        player = Player.objects.get(user__username=username);
        gamehistory = GameHestory.objects.filter(player=player).order_by('-id')
        serializer = GameHestorySerializer(gamehistory, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return JsonResponse({"error": "Player Doesn't Exist !!!"}, safe=False, status=status.HTTP_404_NOT_FOUND)
