from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.GraphModel import Graph
from ..Serializers.GraphSerializer import GraphSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)

### Graph Views ###
@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getMyStatsGraph(request):
    try:
        graph = Player.objects.get(user=request.user).stats.graph
        if request.method == 'GET':
            serializer = GraphSerializer(graph)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = GraphSerializer(graph, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Graph.DoesNotExist:
        return JsonResponse({"error": "Graph not found for player"}, status=status.HTTP_404_NOT_FOUND)

### Graph Views ###
@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerStatsGraph(request, username):
    try:
        graph = Player.objects.get(user__username=username).stats.graph
        if request.method == 'GET':
            serializer = GraphSerializer(graph)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    except Graph.DoesNotExist:
        return JsonResponse({"error": "Graph not found for player"}, status=status.HTTP_404_NOT_FOUND)
