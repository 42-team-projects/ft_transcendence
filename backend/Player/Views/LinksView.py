from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.LinksModel import Links
from ..Serializers.PlayerSerializer import PlayerSerializer
from ..Serializers.LinksSerializer import LinksSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getPlayerLinks(request):
    try:
        player = Player.objects.get(user=request.user)
        links = player.links
    except Links.DoesNotExist:
        return JsonResponse({"error": "No Links exist"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LinksSerializer(links, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'POST':
        try:
            linksData = request.data
            links_list = linksData.get("links", [])
            if links_list:
                createListOfLinksItems(player, links_list)
            else:
                createLinkItem(player, linksData)
            return JsonResponse({"message": "the Link has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

def createLinkItem(player, linkData):
    Links.objects.create(title=linkData.get("title"), url=linkData.get("url"), player=player)


def createListOfLinksItems(player, linksList):
    for link_data in linksList:
        id = link_data.get("id")
        if id:
            link = Links.objects.get(player=player, id=id)
            title = link_data.get("title")
            if title:
                link.title = title
            url = link_data.get("url")
            if url:
                link.url = url
            link.save()
        else:
            createLinkItem(player, link_data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def coutPlayerLinks(request):
    if request.method == 'GET':
        count = Player.objects.get(user=request.user).links.count()
        return JsonResponse(count, safe=False, status=status.HTTP_200_OK)



@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getPlayerLinkById(request, linkId):
    try:

        links = Player.objects.get(user=request.user).links.get(id=linkId)
    except Links.DoesNotExist:
        return JsonResponse({"error": "No Links exist"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LinksSerializer(links)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    if request.method == 'PUT':
        try:
            linksData = request.data
            title = linksData.get("title")
            if title:
                links.title = title
            url = linksData.get("url")
            if url:
                links.url = url
            links.save()
            return JsonResponse({"message": "the Link has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
    if request.method == 'DELETE':
        links.delete()
        return JsonResponse({"message": "the Link has been successfully deleted."}, safe=False, status=status.HTTP_201_CREATED)
    

