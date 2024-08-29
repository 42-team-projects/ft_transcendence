from django.urls import path, include
from . import views as notification_views


urlpatterns = [
    path('receive/', notification_views.receive, name='notifcation-view'),
    path('send/', notification_views.send, name='notifcation-view'),
    # path('2/', notification_views.notification_index2, name='notifcation-view2'),
    # path('3/', notification_views.notification_index3, name='notifcation-view3')
]