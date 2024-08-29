from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .Models.UserModel import User
from .Models.UserProfileModel import UserProfile
from .Serializers.UserSerializer import UserSerializer
from .Serializers.UserProfileSerializer import UserProfileSerializer

from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

import logging

logger = logging.getLogger(__name__)

# Create your views here.
# def printRequest(request):
#     # Start with the request line
#     request_line = f"{request.method} {request.get_full_path()} {request.META.get('SERVER_PROTOCOL', 'HTTP/1.1')}\n"
#     # Collect headers
#     headers = ""
#     for header, value in request.headers.items():
#         headers += f"{header}: {value}\n"
#     # Collect the body
#     if request.method == "POST" or "PUT" or "DELETE":
#         body = request.body.decode('utf-8')
#     else:
#         body = ""
#     # Combine everything into the final output
#     full_request = request_line + headers + "\n" + body
#     # Print the full request
#     print("==== FULL REQUEST ====")
#     print(full_request)
#     print("======================")

# @api_view(['PUT'])
# @csrf_exempt
def index(request):
    return (HttpResponse("Teeeeest"))

def getAllUsersProfile(request):
    if request.method == 'GET':
        Users = User.objects.all()
        serializer = UserSerializer(Users, many=True)
        return JsonResponse(serializer.data, safe=False)

def countUsersProfile(request):
    if request.method == 'GET':
        usersCount = User.objects.count()
        logger.info("number of users is ", usersCount)
        return JsonResponse(usersCount, safe=False)

def Get_UserProfile_Data(request):
    if request.method == 'GET':
        UserProfiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(UserProfiles, many=True)
        return JsonResponse(serializer.data, safe=False)

def Get_UserProfile_Data_With_id(request, id):
    if request.method == 'GET':
        try:
            UserProfile = UserProfile.objects.get(id=id)
            serializer = UserProfileSerializer(UserProfile)
            return JsonResponse(serializer.data, safe=False)
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'Member not found'}, status=404, safe=False)

@csrf_exempt
def EditProfile(request, id):
    printRequest(request)
    if request.method == 'PUT':
        data = JSONParser().parse(request)
        try:
            UserProfile = UserProfile.objects.get(id=id)
            UserProfile.user.name = data.get('name')
            UserProfile.stats.win = data.get('win')
            UserProfile.stats.loss = data.get('loss')
            UserProfile.stats.rank = data.get('rank')
            UserProfile.user.save()
            UserProfile.stats.save()
            UserProfile.save()
            return JsonResponse("profile updated successfully", safe=False)
        except UserProfile.DoesNotExist:
            return JsonResponse("user profile does not exist", safe=False)