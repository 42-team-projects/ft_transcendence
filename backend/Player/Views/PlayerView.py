from django.http import JsonResponse
from ..Models.PlayerModel import Player
from accounts.models import User
from ..Serializers.PlayerSerializer import PlayerSerializer, CustomPlayer
from ..Serializers.StatsSerializer import StatsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


# def createDefaultStats():


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayer(request):
    if request.method == 'GET':
        players = Player.objects.get(user=request.user)
        serializer = PlayerSerializer(players)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    elif request.method == 'PUT':
        try:
            player = Player.objects.get(user=request.user)
            serializer = PlayerSerializer(player, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
            else:
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Player.DoesNotExist:
            return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

    
    elif request.method == 'DELETE':
        try:
            player = Player.objects.get(user=request.user)    
            serializer = PlayerSerializer(player, data=request.data)
            player.stats.graph.delete()
            player.stats.delete()
            player.delete();
            return JsonResponse({"message": "Profile deleted successfully"}, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
                    return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerById(request, playerId):
    if request.method == 'GET':
        try:
            player = Player.objects.get(id=playerId)
            serializer = CustomPlayer(player)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
            return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def findPlayerByUserName(request, username):
    if request.method == 'GET':
        try:
            players = Player.objects.get(user__username=username)
            serializer = PlayerSerializer(players)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
            return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def searchForPlayers(request):
    if request.method == 'GET':
        try:
            username = request.GET.get("username")
            if username:
                players = Player.objects.filter(user__username__icontains=username)
            else:
                players = Player.objects.all()
            serializer = PlayerSerializer(players, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Player.DoesNotExist:
            return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)