from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Player
from .serializers import PlayerSerializer

# Create your views here.

def index(request):
    return HttpResponse("Game")


@csrf_exempt
def signup(request):
    # printRequest(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PlayerSerializer(data=data)
        if serializer.is_valid():
            player = serializer.save()
            return JsonResponse({'status': 'success', 'player': serializer.data}, status=201)
        print("Validation errors: ", serializer.errors)
        return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_exempt
def login(request):
    # printRequest(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        username = data.get('username')
        password = data.get('password')
        try:
            player = Player.objects.get(username=username, password=password)
            serializer = PlayerSerializer(player)
            return JsonResponse({'status': 'success', 'player': serializer.data}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Invalid email or password'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
