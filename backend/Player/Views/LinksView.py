from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Models.LinksModel import Links
from ..Serializers.PlayerSerializer import PlayerSerializer
from ..Serializers.LinksSerializer import LinksSerializer

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'POST'])
def getPlayerLinks(request, playerId):
    try:
        links = Links.objects.filter(player=playerId)
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
                createListOfLinksItems(playerId, links_list)
            else:
                createLinkItem(playerId, linksData)
            return JsonResponse({"message": "the Link has been successfully updated."}, safe=False, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

def createLinkItem(playerId, linkData):
    Links.objects.create(title=linkData.get("title"), url=linkData.get("url"), player = Player.objects.get(id=playerId))


def createListOfLinksItems(playerId, linksList):
    for link_data in linksList:
        id = link_data.get("id")
        if id:
            link = Links.objects.get(player=playerId, id=id)
            title = link_data.get("title")
            if title:
                link.title = title
            url = link_data.get("url")
            if url:
                link.url = url
            link.save()
        else:
            createLinkItem(playerId, link_data)



@api_view(['GET'])
def coutPlayerLinks(request, playerId):
    if request.method == 'GET':
        count = Links.objects.filter(player=playerId).count()
        return JsonResponse(count, safe=False, status=status.HTTP_201_CREATED)



@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def getPlayerLinkById(request, playerId, linkId):
    try:
        links = Links.objects.get(player=playerId, id=linkId)
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
    

