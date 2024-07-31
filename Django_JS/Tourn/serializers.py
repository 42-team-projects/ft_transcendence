from rest_framework import serializers
from .models import Tournament, Player, Stage

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'stage_type', 'stage_datetime', 'is_ready_to_play']


class PlayerSerializer(serializers.ModelSerializer):
    stage = StageSerializer(many=True)
    class Meta:
        model = Player
        fields = ['id', 'name', 'stage']

class TournamentSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True)
    class Meta:
        model = Tournament
        fields = ['id', 'tournament_id', 'tournament_name', 'start_datetime', 'end_datetime', 'number_of_players', 'is_accessible', 'access_password', 'stages']