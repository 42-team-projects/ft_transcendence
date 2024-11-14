from django.http import JsonResponse
from ..Models.StatsModel import Stats
from ..Models.PlayerModel import Player
from ..Serializers.StatsSerializer import StatsSerializer, UpdateStatsSerializer

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status

from ..Models.GraphModel import Graph
from ..Serializers.GraphSerializer import GraphSerializer

import logging
import random

logger = logging.getLogger(__name__)


LEAGUES = {
    "bronze": 1000,
    "silver": 2000,
    "gold": 3000,
    "platinum": 4000,
    "legendary": 6000
}

def getLeague(xp):
    # Update progress_bar based on current xp and next league threshold
    for league, xp_threshold in LEAGUES.items():
        if xp < xp_threshold:
            progress_bar = (xp * 100) // xp_threshold
            return {"league": league, "progress_bar": progress_bar}



def generateGraphValues(stats):
    """
    Generates values for Graph model based on the player's performance stats.
    Values are scaled based on win/loss ratio or can be randomized within certain ranges.
    """

    # serializer = GraphSerializer(stats.graph)

    # Example logic to set skill attributes based on win/loss ratio or random values
    win_loss_ratio = (stats.win / (stats.loss + 1))  # Avoid division by zero

    # Example scaling based on performance
    skill = stats.graph.skill + min(100, int(win_loss_ratio * random.randint(0, 10)))
    speed = stats.graph.speed + min(100, int(win_loss_ratio * random.randint(0, 7)))
    accuracy = stats.graph.accuracy + min(100, int(win_loss_ratio * random.randint(0, 10)))
    defense = stats.graph.defense + min(100, int(win_loss_ratio * random.randint(0, 8)))
    offense = stats.graph.offense + min(100, int(win_loss_ratio * random.randint(0, 5)))
    consistency = stats.graph.consistency + min(100, int(win_loss_ratio * random.randint(0, 6)))
    strategy = stats.graph.strategy +  min(100, int(win_loss_ratio * random.randint(0, 4)))

    return {
        "skill": skill,
        "speed": speed,
        "accuracy": accuracy,
        "defense": defense,
        "offense": offense,
        "consistency": consistency,
        "strategy": strategy,
    }



def calculateStats(stats, win, loss):
    newWin = int(stats.win) + int(win)
    newLoss = int(stats.loss) + int(loss)

    newXp = (newWin - newLoss) * 150
    if newXp < 0:
        newXp = 0;
    
    league = getLeague(newXp)
    progress_bar = league["progress_bar"]
    league = league["league"]
    stats_list = list(Stats.objects.filter(league__icontains=league).order_by("-xp"))
    try:
        newRank = stats_list.index(stats) + 1
    except ValueError:
        newRank = 1
    return {"win": newWin, "loss": newLoss, "rank": newRank, "progress_bar": progress_bar, "league": league, "xp": newXp}




### Stats Views ###
@csrf_exempt
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getMyStats(request):
    try:
        stats = Player.objects.get(user=request.user).stats
        if request.method == 'GET':
            serializer = StatsSerializer(stats)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        elif request.method == 'PUT': 
            win = request.data.get("win", 0)  # default to 0 if 'win' is not present
            loss = request.data.get("loss", 0)  # default to 0 if 'loss' is not present

            data = calculateStats(stats, win, loss)
            graph_values = generateGraphValues(stats)
            serializer = GraphSerializer(stats.graph, data=graph_values)
            if serializer.is_valid():
                serializer.save()
            serializer = StatsSerializer(stats, data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Stats.DoesNotExist:
        return JsonResponse({"error": "Stats not found for player"}, status=status.HTTP_404_NOT_FOUND)
    


@csrf_exempt
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getPlayerStats(request, username):
    try:
        stats = Player.objects.get(user__username=username).stats
        if request.method == 'GET':
            serializer = StatsSerializer(stats)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
    except Stats.DoesNotExist:
        return JsonResponse({"error": "Stats not found for player"}, status=status.HTTP_404_NOT_FOUND)
    
