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


    # def create(self, validated_data):
    #     # Automatically set the sender to the current user
    #     validated_data['sender'] = self.context['request'].user
    #     return Notification.objects.create(**validated_data)


# class NotificationViewSerializer(serializers.ModelSerializer):
#     sender = UserSerializer()
#     receiver = UserSerializer()
#     class Meta:
#         model = Notification
#         fields = ['id', 'sender', 'receiver', 'content', 'create_at']
