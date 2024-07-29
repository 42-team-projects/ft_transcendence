from django.shortcuts import render
from django.http import HttpResponse
from .models import Player
from django.http import JsonResponse
from .serializers import PlayerSerializer
from rest_framework import generics
from rest_framework.decorators import api_view
# from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie #new
from django.views.decorators.csrf import csrf_exempt
import json



# Create your views here.
@api_view(['GET', 'POST'])
def index(request):
    # Start with the request line
    request_line = f"{request.method} {request.get_full_path()} {request.META.get('SERVER_PROTOCOL', 'HTTP/1.1')}\n"

    # Collect headers
    headers = ""
    for header, value in request.headers.items():
        headers += f"{header}: {value}\n"

    # Collect the body
    if request.method == "POST":
        body = request.body.decode('utf-8')
    else:
        body = ""

    # Combine everything into the final output
    full_request = request_line + headers + "\n" + body

    # Print the full request
    print("==== FULL REQUEST ====")
    print(full_request)
    print("======================")
    if request.method == 'GET':
        players = Player.objects.all().values('username', 'password')
        players_list = list(players)
        return JsonResponse(players_list, safe=False)
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        player = Player.objects.create(username=username, password=password)
        return JsonResponse({'id': player.id, 'username': player.username, 'password': player.password})


def Register(request):
    # Start with the request line
    request_line = f"{request.method} {request.get_full_path()} {request.META.get('SERVER_PROTOCOL', 'HTTP/1.1')}\n"

    # Collect headers
    headers = ""
    for header, value in request.headers.items():
        headers += f"{header}: {value}\n"

    # Collect the body
    if request.method == "POST":
        body = request.body.decode('utf-8')
    else:
        body = ""

    # Combine everything into the final output
    full_request = request_line + headers + "\n" + body
    # Print the full request
    print("==== FULL REQUEST ====")
    print(full_request)
    print("======================")
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        player = Player.objects.create(username=username, password=password)
        return JsonResponse({'id': player.id, 'username': player.username, 'password': player.password})

# class index(generics.ListAPIView):
#     queryset = Player.objects.all()
#     serializer_class = PlayerSerializer
