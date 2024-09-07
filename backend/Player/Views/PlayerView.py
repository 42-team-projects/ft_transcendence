from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.LinksModel import Links
from ..Serializers.PlayerSerializer import PlayerSerializer, CustomPlayer, DefaultPlayerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

### Player Views ###




@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getAllPlayers(request):
    if request.method == 'GET':
        players = Player.objects.all()
        serializer = DefaultPlayerSerializer(players, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getMyInfo(request):
    try:
        player = Player.objects.get(user=request.user)
        if request.method:
            serializer = CustomPlayer(player)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = PlayerSerializer(player, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            player.stats.graph.delete();
            player.stats.delete();
            player.delete()
            return JsonResponse({"message": "Player deleted successfully"}, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return JsonResponse({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayerByUsername(request, username):
    try:
        player = Player.objects.get(user__username=username)
        if request.method:
            serializer = CustomPlayer(player)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = PlayerSerializer(player, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            Links.objects.get(player=player).delete()
            player.stats.graph.delete();
            player.stats.delete();
            player.delete()
            return JsonResponse({"message": "Player deleted successfully"}, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return JsonResponse({"error": "Player not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerCount(request):
    player_count = Player.objects.count()
    return JsonResponse({"count": player_count}, status=status.HTTP_200_OK)



