from rest_framework import serializers
from .models import Notification
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class NotificationSerializer(serializers.ModelSerializer):

    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'sender', 'receiver', 'content', 'type', 'data', 'create_at']

