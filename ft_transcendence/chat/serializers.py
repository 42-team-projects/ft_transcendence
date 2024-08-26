from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name']

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'conversation', 'sent_at']

    
class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField('get_last_message')
    title = serializers.SerializerMethodField('get_conversation_title')

    
    class Meta:
        model = Conversation
        fields = ['id', 'title','last_message','created_at']
    
    def get_last_message(self, obj):
        conversation = Conversation.objects.filter(conversation_name=obj.conversation_name).first()
        messages = Message.objects.filter(conversation=conversation.id)
        messages_serializer = MessageSerializer(messages, many=True)
        return (messages_serializer.data[-1])

    def get_conversation_title(self, obj):
        name = obj.conversation_name.split('_')
        if name[0] == "chat":
            user = obj.users.first()
            return user.name if user else "No user found"
        else:
            return name[1]
