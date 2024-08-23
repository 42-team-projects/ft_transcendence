from rest_framework import serializers
from .models import Tournament, Player, Stage

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'name']

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ['id', 'stage_type', 'date']
        # fields = '__all__'

class TournamentSerializer(serializers.ModelSerializer):
    stages = StageSerializer(many=True)
    class Meta:
        model = Tournament
        # fields = '__all__'
        fields = ['id', 'name', 'start_date', 'end_date', 'num_players', 'stages']