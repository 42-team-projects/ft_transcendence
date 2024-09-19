from rest_framework import serializers
from .models import *
from accounts.models import User
import json 


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
        
    
    
    def get_receiver(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            current_user = request.user
            for user in obj.participants.all():
                if user.id != current_user.id:
                    return UserSerializer(user).data
        return None

        
