from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.LinksModel import Links
from ..Serializers.LinksSerializer import LinksSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


### Links Views ###
@csrf_exempt
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayerLinks(request, username):
    if request.method == 'GET':
        links = Links.objects.filter(player__user__username=username)
        serializer = LinksSerializer(links, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = LinksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(player=Player.objects.get(user__username=username))
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayerLinkById(request, username, linkId):
    try:
        link = Links.objects.get(player__user__username=username, id=linkId)
        if request.method == 'GET':
            serializer = LinksSerializer(link)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            serializer = LinksSerializer(link, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif request.method == 'DELETE':
            link.delete()
            return JsonResponse({"message": "Link deleted"}, status=status.HTTP_200_OK)
    except Links.DoesNotExist:
        return JsonResponse({"error": "Link not found"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def countPlayerLinks(request, username):
    link_count = Links.objects.filter(player__user__username=username).count()
    return JsonResponse({"count": link_count}, status=status.HTTP_200_OK)

