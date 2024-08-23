from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import  Tournament, Stage, Player
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .serializers import PlayerSerializer, TournamentSerializer
# from .models import Player, Tournament, PlayerTournament

# Create your views here.

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
def index(request):
    return(HttpResponse("Test Tournament "))

def List_Players(request):
    printRequest(request)
    if request.method == 'GET':
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'status': 'success'})

@csrf_exempt
def create_player(request):
    printRequest(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        Player.objects.create(name=data.get('name'))
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'success'})

def List_Tournament(request):
    printRequest(request)
    if request.method == 'GET':
        Tournaments = Tournament.objects.all()
        serializer  = TournamentSerializer(Tournaments, many=True)
        return JsonResponse(serializer.data, safe=False)
    return JsonResponse({'status': 'success'})

@csrf_exempt
def create_tournament(request):
    printRequest(request)
    if request.method == 'POST':
        # Assume request.POST contains the necessary data
        data = JSONParser().parse(request)
        tournament = Tournament.objects.create(
            name=data.get('name'),
            start_date=data.get('start_date'),
            end_date=data.get('end_date'),
            num_players=data.get('num_players')
        )

        # Create stages
        stages_data = data.get('stages')
        for stage_data in stages_data:
            Stage.objects.create(
                tournament=tournament,
                stage_type=stage_data['stage_type'],
                date=stage_data['date'],
                # ready_to_play=stage_data.get('ready_to_play', False)
            )
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'success'})

# Example of updating a tournament and its stages via a view or API

def update_tournament(request, tournament_id):
    tournament = get_object_or_404(Tournament, id=tournament_id)

    if request.method == 'POST':
        tournament.name = request.POST['name']
        tournament.start_date = request.POST['start_date']
        tournament.end_date = request.POST['end_date']
        tournament.num_players = request.POST['num_players']
        tournament.save()

        # Update stages
        stages_data = request.POST.getlist('stages')
        for stage_data in stages_data:
            stage = get_object_or_404(Stage, id=stage_data['id'])
            stage.stage_type = stage_data['stage_type']
            stage.date = stage_data['date']
            stage.ready_to_play = stage_data.get('ready_to_play', False)
            stage.save()

        return JsonResponse({'status': 'success'})

# def create(request):
#     # Create a player and a tournament
#     player = Player.objects.create(name='John Doe')
#     tournament = Tournament.objects.create(name='Summer Cup')
#     # Add the player to the tournament using the intermediary model
#     PlayerTournament.objects.create(player=player, tournament=tournament)
#     return (HttpResponse("models is created"))

# def check_relationship(request):
#     # Verify the relationship
#     player = Player.objects.get(name='John Doe')
#     tournament = Tournament.objects.get(name='Summer Cup')
#     print(tournament.players.all())  # Should list John Doe
#     print(player.tournaments.all())  # Should list Summer Cup
#     print(Player.objects.all)  # print all players

#     return (HttpResponse("test"))



