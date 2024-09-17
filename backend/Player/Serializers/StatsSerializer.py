from rest_framework import serializers
from ..Models.StatsModel import Stats
from .GraphSerializer import GraphSerializer

class StatsSerializer(serializers.ModelSerializer):
    graph = GraphSerializer(required=False)
    class Meta:
        model = Stats
        fields = ['id', 'win', 'loss', 'rank', 'progress_bar', 'league', 'xp', 'graph']

class DefaultStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = ['id', 'win', 'loss', 'rank', 'progress_bar', 'xp', 'league']

class UpdateStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = ['win', 'loss']
