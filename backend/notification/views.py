from rest_framework.response    import Response
from .models                    import *
from .serializers               import *
from rest_framework.decorators  import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts           import get_object_or_404



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_user_notifications(request):
    notifications = Notification.objects.filter(receiver=request.user)
    notification_serializer = NotificationSerializer(notifications, many=True, context=request)
    return Response(notification_serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_notification(request, notification_id):
    notification = get_object_or_404(Notification, id=notification_id) # receiver=request.user
    notification.delete()
    return Response({'response': 'notification deleted successfuly.'})