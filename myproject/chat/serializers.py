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
    users = UserSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField('get_last_messages')
    title = serializers.SerializerMethodField('get_conversation')
    # last_message = serializers.SerializerMethodField('get_last_message')
    
    class Meta:
        model = Conversation
        fields = ['id', 'users', 'status', 'conversation_name', 'created_at', 'last_message','title']
    
    def get_last_messages(self, obj):
        # print('before')
        conversation = Conversation.objects.filter(conversation_name=obj.conversation_name).first()
        # print('after')
        messages = Message.objects.filter(conversation=conversation.id)
        messages_serializer = MessageSerializer(messages, many=True)
        return (messages_serializer.data[-1])

        
        
    # def get_last_message(self, obj):
        
    #     conversation = Conversation.objects.filter(Conversation, conversation_name=obj.conversation_name)
    #     message = Message.objects.filter(conversation=conversation.id).last()
    #     if message:
    #         message_serializer = MessageSerializer(message)
    #         return message_serializer.data
    #     else:
    #         return {'Error': 'No message found'}
        

    
    
    def get_conversation(self, obj):
        name = obj.conversation_name.split('_')
        if name[0] == "chat":
            user = obj.users.first()
            return user.name if user else "No user found"
        else:
            return name[1]
