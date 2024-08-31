from rest_framework import serializers
from ..Models.AchievementsModel import Achievements

class AchievementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievements
        fields = ['id', 'name', 'img', 'player']
