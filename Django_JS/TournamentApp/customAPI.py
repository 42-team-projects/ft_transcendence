from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import  Tournament, Player
from .serializers import PlayerSerializer, TournamentSerializer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import random



# # TODO: GET ALL TOURNAMENTS THAT CONTAINS THE TOURNAMENT NAME PREFIX
# def get_tournament_by_tournament_name(request, tournamentName):
#     try:
#         tournament = Tournament.objects.get(tournament_name=tournamentName)
#     except Tournament.DoesNotExist:
#         return JsonResponse({'status': 'error', 'message': 'Tournament not found'}, status=status.HTTP_404_NOT_FOUND)
#     if request.method == 'GET':
#         serializer = TournamentSerializer(tournament)
#         return JsonResponse(serializer.data, status=status.HTTP_200_OK)
#     return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

