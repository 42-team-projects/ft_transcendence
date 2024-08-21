from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Tournament
from .serializers import TournamentSerializer
from django.views.decorators.csrf import csrf_exempt
from game.models import Player
from rest_framework import status
from rest_framework.parsers import JSONParser


# Create your views here.

def index(request):
    return HttpResponse("Tournament")

def list_tournaments(request):
    if request.method == 'GET':
        try:
            Tournaments = Tournament.objects.all()
            serializer  = TournamentSerializer(Tournaments, many=True)
            return JsonResponse(serializer.data, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def get_tournament_by_id(request, tournamentId):
    try:
        tournament = Tournament.objects.get(id=tournamentId)
    except Tournament.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = TournamentSerializer(tournament)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# def get_start_date(request, tournamentId):
#     if request.method == 'GET':
#         try:
#             Tournament = Tournament.objects.get(id=tournamentId)
#             serializer  = TournamentSerializer(Tournaments, many=True)
#             return JsonResponse(serializer.data, safe=False, status=200)
#         except Exception as e:
#             return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
#     return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)



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
                serializer = TournamentSerializer(tournament)
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
                # return JsonResponse({'success': launch_tournament(tournament)}, status=200)
            serializer = TournamentSerializer(tournament)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            # return JsonResponse({'success': 'Player successfully joined the tournament'}, status=200)
        except Player.DoesNotExist:
            return JsonResponse({'statusText': 'Player not found'}, status=404)
        except Tournament.DoesNotExist:
            return JsonResponse({'statusText': 'Tournament not found'}, status=404)
    return JsonResponse({'statusText': 'Invalid request method'}, status=405)

@csrf_exempt
def SetStartDate(request):
    if request.method == 'PUT':
        try:
            data = JSONParser().parse(request)
            tournamentId = data.get('tournamentId')
            start_date = data.get('start_date')
            tournament = Tournament.objects.get(id=tournamentId)
            tournament.start_date = start_date
            tournament.save()
            return JsonResponse('start date is updated !', safe=False, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)