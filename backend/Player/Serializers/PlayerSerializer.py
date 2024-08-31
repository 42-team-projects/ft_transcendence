from rest_framework import serializers
from ..Models.PlayerModel import Player
from .LinksSerializer import LinksSerializer
from .StatsSerializer import StatsSerializer
from .AchievementsSerializer import AchievementsSerializer
from accounts.serializers import UserRegisterSerializer

class PlayerSerializer(serializers.ModelSerializer):
    # player = UserRegisterSerializer()
    links = LinksSerializer(many=True)
    stats = StatsSerializer()
    achievements = AchievementsSerializer(many=True)
    class Meta:
        model = Player
        fields = ['id', 'fullName', 'profile_picture', 'cover', 'joinDate', 'active', 'stats', 'achievements', 'links']

    # def update(self, instance, validated_data):
    #     user_data = validated_data.pop('user', None)
    #     if user_data:
    #         user_serializer = LoginSerializer(instance.user, data=user_data, partial=True)
    #         user_serializer.is_valid(raise_exception=True)
    #         user_serializer.save()
        
    #     return super().update(instance, validated_data)
