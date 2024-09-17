from django.http import JsonResponse
from ..Models.StatsModel import Stats
from ..Models.PlayerModel import Player
from ..Serializers.StatsSerializer import StatsSerializer, UpdateStatsSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


### Stats Views ###
@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getMyStats(request):
    try:
        stats = Player.objects.get(user=request.user).stats
        if request.method == 'GET':
            serializer = StatsSerializer(stats)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT': 
            # win = request.data.get("win", 0)  # default to 0 if 'win' is not present
            # loss = request.data.get("loss", 0)  # default to 0 if 'loss' is not present
            # stats.save(win=win, loss=loss)
            # return JsonResponse({"response": "hello"}, status=status.HTTP_200_OK)
            serializer = StatsSerializer(stats, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Stats.DoesNotExist:
        return JsonResponse({"error": "Stats not found for player"}, status=status.HTTP_404_NOT_FOUND)
    


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerStats(request, username):
    try:
        stats = Player.objects.get(user__username=username).stats
        if request.method == 'GET':
            serializer = StatsSerializer(stats)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    except Stats.DoesNotExist:
        return JsonResponse({"error": "Stats not found for player"}, status=status.HTTP_404_NOT_FOUND)
    
