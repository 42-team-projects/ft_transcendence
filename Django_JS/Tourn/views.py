from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import  Tournament, Stage, Player
from .serializers import PlayerSerializer, TournamentSerializer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
@api_view(['POST'])
@csrf_exempt
def create_tournament(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        tournament = Tournament.objects.create(
            tournament_name=data.get('tournament_name'),
            start_datetime=data.get('start_datetime'),
            end_datetime=data.get('end_datetime'),
            number_of_players=data.get('number_of_players'),
            is_accessible=data.get('is_accessible', False),
            access_password=data.get('access_password'),
        )

        # Create stages
        stages_data = data.get('stages')
        for stage_data in stages_data:
            Stage.objects.create(
                tournament=tournament,
                stage_type=stage_data['stage_type'],
                stage_datetime=stage_data['stage_datetime'],
                is_ready_to_play=stage_data.get('is_ready_to_play', False)
            )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'success'})


def List_Tournaments(request):
    if request.method == 'GET':
        Tournaments = Tournament.objects.all()
        serializer  = TournamentSerializer(Tournaments, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'status': 'success'})


def List_Players(request):
    if request.method == 'GET':
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=all)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'status': 'success'})

def get_tournament_by_id(request, id):
    if request.method == 'GET':
        tournament = Tournament.objects.get(id=id)
        serializer  = TournamentSerializer(tournament)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'status': 'success'})

def get_tournaments_by_player_id(request, player_id):
    try:
        player = Player.objects.get(id=player_id)
    except Player.DoesNotExist:
        return JsonResponse({'error': 'Player not found'})
    
    tournaments = player.tournaments.all()  # Get all tournaments associated with the player
    serializer = TournamentSerializer(tournaments, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_Available_Tournaments(request):
    if request.method == 'GET':
        Tournaments = Tournament.objects.filter(can_join=True)
        serializer  = TournamentSerializer(Tournaments, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'status': 'success'})

def Player_Join_Tournament(request): # this function i have switsh request method to post
    if request.method == 'GET':
        tournament = Tournament.objects.get(id=4)
        player = Player.objects.get(id=2)
        tournament.players.add(player)
        return JsonResponse({'status': 'Player with id 2 join tournament with id 4'})
    return JsonResponse({'status': 'success'})

def player_leave_tournament(request): # this function i have switsh request method to post
    if request.method == 'GET':
        tournament = Tournament.objects.get(id=4)
        player = Player.objects.get(id=2)
        if player in tournament.players.all():
            tournament.players.remove(player)
            return JsonResponse({'status': 'Player with id 2 remove from tournament with id 4'})
        else:
            return JsonResponse({'status': 'Player is not in this tournament'})
    
def index(request):
    return HttpResponse("Teeeeeeeeeet")
