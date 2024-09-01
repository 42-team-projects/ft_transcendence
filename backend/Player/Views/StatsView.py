from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.GraphModel import Graph
from ..Serializers.StatsSerializer import StatsSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getPlayerStats(request):
    try:
        stats = Player.objects.get(user=request.user).stats
    except Player.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StatsSerializer(stats)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


    if request.method == 'PUT':
        try:
            statsData = request.data
            win = statsData.get("win")
            loss = statsData.get("loss")
            rank = statsData.get("rank")
            league = statsData.get("league")
            if win:
                stats.win = win
            if loss:
                stats.loss = loss
            if rank:
                stats.rank = rank
            if league:
                stats.league = league
            stats.save()
            return JsonResponse({"message": "the stats has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


