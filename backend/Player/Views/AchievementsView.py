from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.AchievementsModel import Achievements
from ..Serializers.AchievementsSerializer import AchievementsSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)

### Achievement Views ###
@csrf_exempt
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def getMyAchievements(request):
    if request.method == 'GET':
        achievements = Achievements.objects.filter(player__user=request.user)
        serializer = AchievementsSerializer(achievements, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = AchievementsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(player=Player.objects.get(user=request.user))
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        Achievements.objects.filter(player__user=request.user).delete()
        return JsonResponse({"message": "The Achievements hs successfully deleted!"}, safe=False, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerAchievements(request, username):
    if request.method == 'GET':
        achievements = Achievements.objects.filter(player__user__username=username)
        serializer = AchievementsSerializer(achievements, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayerAchievementById(request, username, achievementId):
    try:
        achievement = Achievements.objects.get(player__user__username=username, id=achievementId)
        if request.method == 'GET':
            serializer = AchievementsSerializer(achievement)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = AchievementsSerializer(achievement, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            achievement.delete()
            return JsonResponse({"message": "Achievement deleted"}, status=status.HTTP_200_OK)
    except Achievements.DoesNotExist:
        return JsonResponse({"error": "Achievement not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def countPlayerAchievements(request, username):
    achievement_count = Achievements.objects.filter(player__user__username=username).count()
    return JsonResponse({"count": achievement_count}, status=status.HTTP_200_OK)
