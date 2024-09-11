from rest_framework import serializers
from .models import Notification
from accounts.models import User

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'content', 'create_at']


############ @esalim ##############

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', ]


class NotificationListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Notification
        fields = ['id', 'user', 'content', 'create_at']
