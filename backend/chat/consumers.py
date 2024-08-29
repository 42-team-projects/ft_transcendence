import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import *
from .serializers import *

from django.core.exceptions import ObjectDoesNotExist



class ChatConversationConsumer(WebsocketConsumer):
    def connect(self):
        self.current_user = self.scope['user']
        if self.current_user.is_authenticated:
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            self.group_name = f"chat_{self.room_name}"
            
            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.group_name,
                self.channel_name
            )
            self.accept()
        else:
            self.close()
    def disconnect(self, close_code):
        # if user is authenticated remove user from group_name Conversation
        
        if self.current_user.is_authenticated:
            # Leave room group
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name,
                self.channel_name
            )
    def receive(self, text_data):
        if (self.current_user.is_authenticated):
            try:
                # Parse incoming message data
                data = json.loads(text_data)
                print(data)
                
                self.receiver = self.get_user(data['receiver'])
                if (self.current_user.id == self.receiver.id):
                    self.send_error('sender and receiver is same user!')
                else:
                    self.save_and_broadcast_message(data['message'])
            except ObjectDoesNotExist:
                # Handle the case where the user does not exist
                self.send_error('User does not exist.')
            except json.JSONDecodeError:
                self.send_error('Invalid JSON format.')
            except KeyError as e:
                self.send_error(f'Missing key: {e}')
        else:
            self.send_error('User not authenticated!')

    def save_and_broadcast_message(self, content):
        self.get_or_create_conversation()
        message_data = {
            'sender': self.current_user.id,
            'content': content,
            'conversation': self.conversation.id,
        }
        
        message_serializer = MessageSerializer(data=message_data)
        if message_serializer.is_valid():
            message = message_serializer.save()
            self.broadcast_message(message_serializer.data)
        else:
            self.send_error(message_serializer.errors)
    def get_or_create_conversation(self):
        chat_conversation = Conversation.objects.filter(participants=self.current_user).filter(
            participants=self.receiver,
            conversation_name=self.group_name)
        if chat_conversation.exists():
            self.conversation = chat_conversation.first()
        else:
            self.conversation = Conversation.objects.create(
                status='C',
                conversation_name=self.group_name)
            self.conversation.participants.add(
                self.current_user.id,
                self.receiver.id)            
    def get_user(self, user_id):
        return User.objects.get(id=user_id) 
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




# class GroupConversationConsumer(WebsocketConsumer):
#     def connect(self):
#         # if user is authenticated add user to group_name Conversation
        
#         self.user = self.scope['user']
#         self.user_id = self.user.id
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.group_name = f"group_{self.room_name}"
        
        
#         if self.user.is_authenticated:
#             conversation = self.get_or_create_conversation()
#             if conversation:
#                 # user = self.get_user(self.user_id)
                
#                 # If self.user_id is the authenticated user ID, you can just use self.user
#                 user = self.get_user(self.user_id)
#                 if user:
#                     conversation.users.add(user)
#                 else:
#                     self.send_error('user not found in database!')
#                     return 

#                 # Join room group
#                 async_to_sync(self.channel_layer.group_add)(
#                     self.group_name,
#                     self.channel_name
#                 )
#                 self.accept()
#             else:
#                 # Handle case where conversation could not be created
#                 self.send_error('conversation could not be created')
#                 self.close()
#         else:
#             self.send_error('user is not authenticated')
#             self.close()


#         # self.user_id = 36
#         # user = self.get_user(self.user_id)
#         # if user:
#         #     conversation = self.get_or_create_conversation()      
#         #     if conversation:
#         #         conversation.users.add(user)
#         #         conversation.save()
#         # else:
#         #     self.close()
#         #     return
#         # # Join room group
#         # async_to_sync(self.channel_layer.group_add)(
#         #     self.group_name,
#         #     self.channel_name
#         # )
#         # self.accept()

#     def disconnect(self, close_code):
#         # if self.user.is_authenticated:
#         #     # Leave room group
#         #     async_to_sync(self.channel_layer.group_discard)(
#         #         self.group_name,
#         #         self.channel_name
#         #     )
        
#         # if self.user.is_authenticated:
#         # Leave room group
#         async_to_sync(self.channel_layer.group_discard)(
#             self.group_name,
#             self.channel_name
#         )
        
#     def receive(self, text_data):
#         # data = json.loads(text_data)
#         try:
#             # Parse incoming message data
#             data = json.loads(text_data)
            
#             # user = self.user_id
#             user = self.get_user(self.user_id)

#             if not user:
#                 self.send_error('One or both users do not exist in the database.')
#                 return

#             # Save the message and broadcast it
#             self.save_and_broadcast_message(user, data['message'])

#         except json.JSONDecodeError:
#             self.send_error('Invalid JSON format.')
#         except KeyError as e:
#             self.send_error(f'Missing key: {e}')


#     def get_user(self, user_id):
#         return User.objects.filter(id=user_id).first()

#     def save_and_broadcast_message(self, user, content):
#         conversation = self.get_or_create_conversation()
#         conversation.users.add(user)
#         message_data = {
#             'sender': user.id,
#             'content': content,
#             'conversation': conversation.id
#         }
#         message_serializer = MessageSerializer(data=message_data)
#         if message_serializer.is_valid():
#             message = message_serializer.save()
#             self.broadcast_message(message_serializer.data)
#         else:
#             self.send_error(message_serializer.errors)

#     def get_or_create_conversation(self):
#         conversation = Conversation.objects.filter(conversation_name=self.group_name).first()
#         if conversation:
#             return conversation
#         conversation = Conversation.objects.create(status='G', conversation_name=self.group_name)
#         if conversation:
#             return conversation
#         else:
#             self.send_error({'error': 'data not store in database!'})
#             return None

#     def broadcast_message(self, message_data):
#         async_to_sync(self.channel_layer.group_send)(
#             self.group_name,
#             {
#                 'type': 'send_message',
#                 'message': message_data
#             }
#         )

#     def send_error(self, error_message):
#         self.send(text_data=json.dumps({'Error': error_message}))
    
#     def send_message(self, event):
#         message = event['message']
#         print(message)
#         self.send(text_data=json.dumps(message))