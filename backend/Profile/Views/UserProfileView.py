from django.http import JsonResponse
from ..Models.UserProfileModel import UserProfile
from ..Serializers.UserProfileSerializer import UserProfileSerializer

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

import logging

logger = logging.getLogger(__name__)


@csrf_exempt
@api_view(['GET', 'POST'])
def getAllUsersProfile(request):
    if request.method == 'GET':
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    if request.method == 'POST':
        try:
            serializer = UserProfileSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  
                return JsonResponse(serializer.data, safe=False, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def countUsersProfile(request):
    if request.method == 'GET':
        usersCount = UserProfile.objects.count()
        return JsonResponse(usersCount, safe=False)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def getUserProfileById(request, id):

    try:
        user = UserProfile.objects.get(id=id)
    except UserProfile.DoesNotExist:
        return JsonResponse({"error": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserProfileSerializer(user)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    
    if request.method == 'PUT':
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
    if request.method == 'DELETE':
        user.delete();
        return JsonResponse({"message": "Profile deleted successfully"}, status=status.HTTP_200_OK)


