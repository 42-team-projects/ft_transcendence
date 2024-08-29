from rest_framework import serializers
from ..Models.UserProfileModel import UserProfile
from .LinksSerializer import LinksSerializer
from .StatsSerializer import StatsSerializer
from .AchievementsSerializer import AchievementsSerializer

class UserProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    links = LinksSerializer(many=True)
    stats = StatsSerializer()
    achievements = AchievementsSerializer(many=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'profile_picture', 'joinDate', 'active', 'links', 'stats', 'achievements']

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
            user_serializer.is_valid(raise_exception=True)
            user_serializer.save()
        
        return super().update(instance, validated_data)
