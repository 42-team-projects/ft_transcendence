from django.http import JsonResponse
from ..Models.StatsModel import Stats
from ..Models.PlayerModel import Player
from ..Serializers.StatsSerializer import StatsSerializer

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
def getPlayerStats(request, username):
    try:
        stats = Player.objects.get(user__username=username).stats
        if request.method == 'GET':
            serializer = StatsSerializer(stats)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = StatsSerializer(stats, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Stats.DoesNotExist:
        return JsonResponse({"error": "Stats not found for player"}, status=status.HTTP_404_NOT_FOUND)