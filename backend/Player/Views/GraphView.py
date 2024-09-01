from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.GraphModel import Graph
from ..Serializers.GraphSerializer import GraphSerializer

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
def getPlayerStatsGraph(request):
    try:
        graph = Player.objects.get(user=request.user).stats.graph
    except Player.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GraphSerializer(graph)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)


    if request.method == 'PUT':
        try:
            graphData = request.data
            updateGraph(graphData, graph)
            graph.save()
            return JsonResponse({"message": "the graph has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def updateGraph(srcGraph, destGraph):
   speed = srcGraph.get("speed")
   skill = srcGraph.get("skill")
   accuracy = srcGraph.get("accuracy")
   defense = srcGraph.get("defense")
   offense = srcGraph.get("offense")
   consistency = srcGraph.get("consistency")
   strategy = srcGraph.get("strategy")
   
   if speed:
       destGraph.speed = speed
   if skill:
       destGraph.skill = skill
   if accuracy:
       destGraph.accuracy = accuracy
   if defense:
       destGraph.defense = defense
   if offense:
       destGraph.offense = offense
   if consistency:
       destGraph.consistency = consistency
   if strategy:
       destGraph.strategy = strategy
