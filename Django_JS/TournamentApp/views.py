from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import  Tournament, Player
from .serializers import PlayerSerializer, TournamentSerializer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import random

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
def create_tournament(request, player_id):
    printRequest(request)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TournamentSerializer(data=data)
        if serializer.is_valid():
            tournament = serializer.save()
            player = Player.objects.get(id=player_id)
            tournament.players.add(player)
            return JsonResponse({'status': 'success', 'tournament': serializer.data}, status=201)
        print("Validation errors:", serializer.errors)
        return JsonResponse({'status': 'error', 'errors': serializer.errors}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)


@csrf_exempt
def signup(request):
    printRequest(request)
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
    printRequest(request)
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

def play_game(player1, player2):
    score1 = random.randint(0, 5)
    score2 = random.randint(0, 5)
    print(f"Game played between {player1.username} and {player2.username}")
    print(f"Scores: {player1.username} - {score1}, {player2.username} - {score2}")
    return score1, score2
    #///////////// play game with send players tp game_service to play /////////////
    # # Define the API endpoint for starting a game
    # api_url = "http://game-service:8002/api/games/play"
    # # Create the payload with player IDs
    # payload = {
    #     'player1_id': player1.id,
    #     'player2_id': player2.id
    # }
    # # Make a POST request to the Game Service API
    # response = requests.post(api_url, json=payload)
    # # Check if the request was successful
    # if response.status_code == 200:
    #     # Extract scores from the response
    #     data = response.json()
    #     score1 = data['score1']
    #     score2 = data['score2']
    #     return score1, score2
    # else:
    #     # Handle error or unexpected response
    #     raise Exception("Failed to get game result from Game Service")
    #///////////// EEEENNNENENENENENEENENENENDDDDDDD /////////////


def launch_tournament_test(request):
    tournament = Tournament.objects.get(id=2)
    print("Tournament with name {} is started.".format(tournament.tournament_name))
    while tournament.players.count() > 1:
        players = tournament.players.all()
        i = 0
        while i < len(players) - 1:
            player1 = players[i]
            player2 = players[i + 1]
            score1, score2 = play_game(player1, player2)
            if score1 >= score2:
                tournament.players.remove(player2)
            else:
                tournament.players.remove(player1)
            i += 2
    if tournament.players.count() == 1:
        Winner = tournament.players.first()
    return JsonResponse({"Player Win": Winner.name}, safe=False)

# def launch_tournament_test_Old(request):
#     tournament = Tournament.objects.get(id=2)
#     print("Tournament with name {} is started.".format(tournament.tournament_name))
#     players = tournament.players.all()
#     i = 0
#     # results = []
#     while i < len(players) - 1:
#         player1 = players[i]
#         player2 = players[i + 1]
#         score1, score2 = play_game(player1, player2)
#         # results.append({
#         #         'player1': player1.name,
#         #         'player2': player2.name,
#         #         'score1': score1,
#         #         'score2': score2
#         #     })
#         if score1 >= score2:
#             tournament.players.remove(player2)
#         else:
#             tournament.players.remove(player1)
#         i += 2
#     # print(results[0])
#     # serializer = PlayerSerializer(players, many=True)
#     return JsonResponse("Test Tournament", safe=False)

def launch_tournament(tournament):
    players = tournament.players.all()
    serilizer = PlayerSerializer(players, many=True)
    print("Tournament with name {} is started.".format(tournament.tournament_name))
    while tournament.players.count() > 1:
        players = tournament.players.all()
        i = 0
        while i < len(players) - 1:
            player1 = players[i]
            player2 = players[i + 1]
            score1, score2 = play_game(player1, player2)
            if score1 >= score2:
                tournament.players.remove(player2)
            else:
                tournament.players.remove(player1)
            i += 2
    if tournament.players.count() == 1:
        Winner = tournament.players.first()
        print("player with name  ", Winner.username , "  is Win .")
        return {"statusText": "Player Win", "Winner": Winner.username}
    else:
        return {"statusText": "No players left"}

@csrf_exempt
def player_join_tournament(request, tournamentId, playerId):
    if request.method == 'POST':
        try:
            player = Player.objects.get(id=playerId)
            tournament = Tournament.objects.get(id=tournamentId)
            if not tournament.can_join:
                return JsonResponse({'statusText': 'Tournament is not open for new players'}, status=400)

            if player in tournament.players.all():
                return JsonResponse({'statusText': 'Player is already in the tournament'}, status=400)

            tournament.players.add(player)
            tournament.save()
            if tournament.players.count() >= tournament.number_of_players:
                tournament.can_join = False
                tournament.save()
                # launch_tournament(tournament) # here call launch_tournament function
                return JsonResponse({'success': launch_tournament(tournament)}, status=200)
            return JsonResponse({'success': 'Player successfully joined the tournament'}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'statusText': 'Player not found'}, status=404)
        except Tournament.DoesNotExist:
            return JsonResponse({'statusText': 'Tournament not found'}, status=404)
    return JsonResponse({'statusText': 'Invalid request method'}, status=405)


@csrf_exempt
def player_leave_tournament(request, tournamentId, playerId):
    if request.method == 'POST':
        try:
            player = Player.objects.get(id=playerId)
            tournament = Tournament.objects.get(id=tournamentId)
            # if not tournament.can_join:
            #     return JsonResponse({'statusText': 'Tournament is not open for new players'}, status=400)

            # if player not in tournament.players.all():
            #     return JsonResponse({'statusText': 'Player is not in the tournament'}, status=400)

            # tournament.players.add(player)
            tournament.players.remove(player)
            tournament.save()
            # if tournament.players.count() >= tournament.number_of_players:
            #     tournament.can_join = False
            #     tournament.save()
                # launch_tournament(tournament) # here call launch_tournament function
                # return JsonResponse({'success': launch_tournament(tournament)}, status=200)
            return JsonResponse({'success': 'Player successfully leaved the tournament'}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'statusText': 'Player not found'}, status=404)
        except Tournament.DoesNotExist:
            return JsonResponse({'statusText': 'Tournament not found'}, status=404)
    return JsonResponse({'statusText': 'Invalid request method'}, status=405)