from rest_framework import serializers
from .models import *
from accounts.models import User
import json 

# from Player.Serializers.PlayerSerializer import UserSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'avatar', 'username', 'is_active']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'conversation', 'sent_at']

class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField('get_last_message')
    # reciever     = UserSerializer(source='participants', many=True, read_only=True)
    reciever = serializers.SerializerMethodField('get_receiver')
    
    class Meta:
        model = Conversation
        fields = ['id', 'title', 'reciever', 'last_message', 'created_at']
    
    def get_last_message(self, obj):
        conversation = Conversation.objects.filter(title=obj.title).first()
        messages = Message.objects.filter(conversation=conversation.id)
        messages_serializer = MessageSerializer(messages, many=True)
        message = ""
        if messages_serializer.data:
            message = messages_serializer.data[-1]
        return (message)
        
    
    # def get_receiver(self, obj):
    #     # Fetch all users associated with the conversation
    #     users = obj.participants.all()

    #     if users.exists():
    #         # Assume the first user is always the sender
    #         sender = users.first()

    #         # Filter out the sender to get the list of potential receivers
    #         potential_receivers = users.exclude(id=sender.id)

    #         # Select the first user from the remaining list as the receiver
    #         if potential_receivers.exists():
    #             receiver_user = potential_receivers.first()
    #             return {'username': receiver_user.username}  # Customize the output format if needed
    #     return None  # If no receiver is found
    
    
    def get_receiver(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            current_user = request.user
            for user in obj.participants.all():
                if user.id != current_user.id:
                    return UserSerializer(user).data
        return None

        
