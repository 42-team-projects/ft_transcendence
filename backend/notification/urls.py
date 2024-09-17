from django.urls import path
from . import views as notification_views


urlpatterns = [
    path('notifications_list/', notification_views.list_user_notifications, name='notifcation-view'),
    path('remove/<str:notification_id>/', notification_views.remove_notification, name='remove-notification'),
]