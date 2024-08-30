from django.http import JsonResponse
from ..Models.PlayerModel import Player
from ..Serializers.PlayerSerializer import PlayerSerializer

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'POST'])
def getAllPlayers(request):
    if request.method == 'GET':
        users = Player.objects.all()
        serializer = PlayerSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    if request.method == 'POST':
        try:
            serializer = PlayerSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  
                return JsonResponse(serializer.data, safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def countPlayers(request):
    if request.method == 'GET':
        usersCount = Player.objects.count()
        return JsonResponse(usersCount, safe=False)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def getPlayerById(request, id):

    try:
        user = Player.objects.get(id=id)
    except Player.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PlayerSerializer(user)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        serializer = PlayerSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    if request.method == 'DELETE':
        user.delete();
        return JsonResponse({"message": "Profile deleted successfully"}, status=status.HTTP_200_OK)


