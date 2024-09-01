from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.AchievementsModel import Achievements
from ..Serializers.PlayerSerializer import PlayerSerializer
from ..Serializers.AchievementsSerializer import AchievementsSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getPlayerAchievements(request):
    try:
        player = Player.objects.get(user=request.user)
        achievements = player.achievements
    except Player.DoesNotExist:
        return JsonResponse({"error": "No achievements exist"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AchievementsSerializer(achievements, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        try:
            achievementsData = request.data
            Achievements.objects.create(name=achievementsData.get("name"), img=achievementsData.get("img"), player = player)
            return JsonResponse({"message": "the achievement has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def coutPlayerAchievements(request):
    if request.method == 'GET':
        achievements = Player.objects.get(user=request.user).achievements
        return JsonResponse(achievements.count(), safe=False, status=status.HTTP_201_CREATED)



@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayerAchievementById(request, achievementId):
    try:
        achievements = Player.objects.get(user=request.user).achievements.get(id=achievementId)
    except Achievements.DoesNotExist:
        return JsonResponse({"error": "No achievements exist"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = AchievementsSerializer(achievements)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        try:
            achievementsData = request.data
            name = achievementsData.get("name")
            img = achievementsData.get("img")
            if name:
                achievements.name = name
            if img:
                achievements.img = img
            achievements.save()
            return JsonResponse({"message": "the achievement has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'DELETE':
        achievements.delete()
        return JsonResponse({"message": "the achievement has been successfully deleted."}, safe=False, status=status.HTTP_201_CREATED)
    

