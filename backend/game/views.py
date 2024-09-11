
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from .models import GamePlay
from .serializers import GamePlaySerializer


@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getGamePlayOfTheCurrentUser(request):
    try:
        gameplay = GamePlay.objects.get(player__user=request.user)
    except GamePlay.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GamePlaySerializer(gameplay)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        data = request.data;
        serializer = GamePlaySerializer(gameplay, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, safe=False, status=status.HTTP_200_OK)
        

