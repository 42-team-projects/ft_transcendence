from .Models.GraphModel import Graph
from .Models.StatsModel import Stats


def createNewPlayer(user):
    from .Models.PlayerModel import Player
    graph = Graph.objects.create()
    stats = Stats.objects.create(win=0, loss=0, rank=0, league="BRONZE", graph=graph)
    Player.objects.create(active=True, stats=stats, user=user)

