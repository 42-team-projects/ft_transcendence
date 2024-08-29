from django.http import JsonResponse
from ..Models.StatsModel import Stats
from ..Serializers.StatsSerializer import StatsSerializer

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'POST', 'PUT'])
def getUserStats(request, id):
    if request.method == 'GET':
        stats = Stats.objects.all()
        serializer = StatsSerializer(stats, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    if request.method == 'POST':
        try:
            serializer = StatsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  
                return JsonResponse(serializer.data, safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PUT':
        try:
            serializer = StatsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  
                return JsonResponse(serializer.data, safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

def countUserStats(request):
    if request.method == 'GET':
        statsCount = Stats.objects.count()
        return JsonResponse(statsCount, safe=False)

