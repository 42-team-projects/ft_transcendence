import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import *


class ChatConversationConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        
        print(self.scope)
        # print(self.user)
        
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f"chat_{self.room_name}"
        # self.user = self.scope['user']
        # if self.user.is_authenticated:
        #     # Join room group
        #     async_to_sync(self.channel_layer.group_add)(
        #         self.group_name,
        #         self.channel_name
        #     )
        #     self.accept()
        # else:
        #     self.close()
        

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # if self.user.is_authenticated:
        #     # Leave room group
        #     async_to_sync(self.channel_layer.group_discard)(
        #         self.group_name,
        #         self.channel_name
        #     )
        
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )
        
    def receive(self, text_data):
        try:
            # Parse incoming message data
            data = json.loads(text_data)
            
            # sender = self.user.id
            sender = self.get_user(1)
            if not sender:
                self.send_error('user do not exist in the database.')
                return
            # Save the message and broadcast it
            self.save_and_broadcast_message(sender, data['message'])

        except json.JSONDecodeError:
            self.send_error('Invalid JSON format.')
        except KeyError as e:
            self.send_error(f'Missing key: {e}')



    def get_user(self, user_id):
        return User.objects.filter(id=user_id).first()

    def save_and_broadcast_message(self, sender, content):
        conversation = self.get_or_create_conversation()
        conversation.users.add(sender)
        message_data = {
            'sender': sender.id,
            'content': content,
            'conversation': conversation.id
        }
        message_serializer = MessageSerializer(data=message_data)
        if message_serializer.is_valid():
            message = message_serializer.save()
            self.broadcast_message(message_serializer.data)
        else:
            self.send_error(message_serializer.errors)

    def get_or_create_conversation(self):
        conversation = Conversation.objects.filter(conversation_name=self.group_name).first()
        if conversation:
            return conversation
        conversation_data = {
            'status' : 'C',
            'conversation_name' : self.group_name
        }
        conversation_serializer = ConversationSerializer(data=conversation_data)
        if conversation_serializer.is_valid():
            conversation = conversation_serializer.save()
            return conversation
        else:
            self.send_error(conversation_serializer.errors)
            return None

    def broadcast_message(self, message_data):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'send_message',
                'message': message_data
            }
        )

    def send_error(self, error_message):
        self.send(text_data=json.dumps({'Error': error_message}))
    
    def send_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))





class GroupConversationConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope['user']
        self.user_id = self.user.id
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = f"group_{self.room_name}"
        
        
        if self.user.is_authenticated:
            conversation = self.get_or_create_conversation()
            if conversation:
                # user = self.get_user(self.user_id)
                
                # If self.user_id is the authenticated user ID, you can just use self.user
                user = self.get_user(self.user_id)
                if user:
                    conversation.users.add(user)
                else:
                    self.send_error('user not found in database!')
                    return 

                # Join room group
                async_to_sync(self.channel_layer.group_add)(
                    self.group_name,
                    self.channel_name
                )
                self.accept()
            else:
                # Handle case where conversation could not be created
                self.send_error('conversation could not be created')
                self.close()
        else:
            self.send_error('user is not authenticated')
            self.close()


        # self.user_id = 36
        # user = self.get_user(self.user_id)
        # if user:
        #     conversation = self.get_or_create_conversation()      
        #     if conversation:
        #         conversation.users.add(user)
        #         conversation.save()
        # else:
        #     self.close()
        #     return
        # # Join room group
        # async_to_sync(self.channel_layer.group_add)(
        #     self.group_name,
        #     self.channel_name
        # )
        # self.accept()

    def disconnect(self, close_code):
        # if self.user.is_authenticated:
        #     # Leave room group
        #     async_to_sync(self.channel_layer.group_discard)(
        #         self.group_name,
        #         self.channel_name
        #     )
        
        # if self.user.is_authenticated:
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )
        
    def receive(self, text_data):
        # data = json.loads(text_data)
        try:
            # Parse incoming message data
            data = json.loads(text_data)
            
            # user = self.user_id
            user = self.get_user(self.user_id)

            if not user:
                self.send_error('One or both users do not exist in the database.')
                return

            # Save the message and broadcast it
            self.save_and_broadcast_message(user, data['message'])

        except json.JSONDecodeError:
            self.send_error('Invalid JSON format.')
        except KeyError as e:
            self.send_error(f'Missing key: {e}')


    def get_user(self, user_id):
        return User.objects.filter(id=user_id).first()

    def save_and_broadcast_message(self, user, content):
        conversation = self.get_or_create_conversation()
        conversation.users.add(user)
        message_data = {
            'sender': user.id,
            'content': content,
            'conversation': conversation.id
        }
        message_serializer = MessageSerializer(data=message_data)
        if message_serializer.is_valid():
            message = message_serializer.save()
            self.broadcast_message(message_serializer.data)
        else:
            self.send_error(message_serializer.errors)

    def get_or_create_conversation(self):
        conversation = Conversation.objects.filter(conversation_name=self.group_name).first()
        if conversation:
            return conversation
        conversation_data = {
            'status' : 'G',
            'conversation_name' : self.group_name
        }
        conversation_serializer = ConversationSerializer(data=conversation_data)
        if conversation_serializer.is_valid():
            conversation = conversation_serializer.save()
            return conversation
        else:
            self.send_error(conversation_serializer.errors)
            return None

    def broadcast_message(self, message_data):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'send_message',
                'message': message_data
            }
        )

    def send_error(self, error_message):
        self.send(text_data=json.dumps({'Error': error_message}))
    
    def send_message(self, event):
        message = event['message']
        print(message)
        self.send(text_data=json.dumps(message))