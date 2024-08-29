from rest_framework import serializers
from ..Models.StatsModel import Stats

class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stats
        fields = ['id','win', 'loss', 'rank', 'league']
