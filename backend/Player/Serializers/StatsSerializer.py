from rest_framework import serializers
from ..Models.StatsModel import Stats
from .GraphSerializer import GraphSerializer

class StatsSerializer(serializers.ModelSerializer):
    graph = GraphSerializer()
    class Meta:
        model = Stats
        fields = ['id', 'win', 'loss', 'rank', 'league', 'graph']
