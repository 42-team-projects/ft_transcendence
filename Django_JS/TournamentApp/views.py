from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import  Tournament, Player
from .serializers import PlayerSerializer, TournamentSerializer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

# Create your views here.

def index(request):
    return HttpResponse("Teeeeeeeeeet")

def printRequest(request):
    # Start with the request line
    request_line = f"{request.method} {request.get_full_path()} {request.META.get('SERVER_PROTOCOL', 'HTTP/1.1')}\n"
    # Collect headers
    headers = ""
    for header, value in request.headers.items():
        headers += f"{header}: {value}\n"
    # Collect the body
    if request.method == "POST" or "PUT" or "DELETE":
        body = request.body.decode('utf-8')
    else:
        body = ""
    # Combine everything into the final output
    full_request = request_line + headers + "\n" + body
    # Print the full request
    print("==== FULL REQUEST ====")
    print(full_request)
    print("======================")

@api_view(['POST'])
@csrf_exempt
def create_tournament(request):
    printRequest(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TournamentSerializer(data=data)
        if serializer.is_valid():
            tournament = serializer.save()
            return JsonResponse({'status': 'success', 'tournament': serializer.data}, status=201)
        print("Validation errors:", serializer.errors)
        return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def list_tournaments(request):
    if request.method == 'GET':
        try:
            Tournaments = Tournament.objects.all()
            serializer  = TournamentSerializer(Tournaments, many=True)
            return JsonResponse(serializer.data, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def get_tournament_by_id(request, id):
    try:
        tournament = Tournament.objects.get(id=id)
    except Tournament.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TournamentSerializer(tournament)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


def get_available_tournaments(request):
    if request.method == 'GET':
        tournaments = Tournament.objects.filter(can_join=True)
        serializer = TournamentSerializer(tournaments, many=True)
        return JsonResponse(serializer.data, safe=False, status=200)
    
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


def get_tournaments_by_player_id(request, player_id):
    try:
        player = Player.objects.get(id=player_id)
    except Player.DoesNotExist:
        return JsonResponse({'error': 'Player not found'})
    
    tournaments = player.tournaments.all()  # Get all tournaments associated with the player
    serializer = TournamentSerializer(tournaments, many=True)
    return JsonResponse(serializer.data, safe=False)