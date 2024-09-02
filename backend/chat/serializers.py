from rest_framework import serializers
from .models import *

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'conversation', 'sent_at']

class ConversationSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField('get_last_message')
    reciever = serializers.SerializerMethodField('get_reciever_user')
    
    class Meta:
        model = Conversation
        fields = ['id', 'reciever','last_message', 'created_at']
    
    def get_last_message(self, obj):
        conversation = Conversation.objects.filter(title=obj.title).first()
        messages = Message.objects.filter(conversation=conversation.id)
        messages_serializer = MessageSerializer(messages, many=True)
        return (messages_serializer.data[-1])
    def get_reciever_user(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            current_user = request.user
            for user in obj.participants.all():
                if user.id != current_user.id:
                    return user
        return None

        