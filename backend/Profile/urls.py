from django.urls import path
from .Views import UserProfileView, StatsView

urlpatterns = [
    # recieve, create user ("GET", "POST")
    path('',UserProfileView.getAllUsersProfile, name='getAllUsersProfile'),
    # number of users ("GET")
    path('count/',UserProfileView.countUsersProfile, name='countUsersProfile'),
    # recieve, update, delete user ("GET", "PUT", "DELETE")
    path('<int:id>/',UserProfileView.getUserProfileById, name='getUserProfileById'),


    path('<int:id>/stats/',StatsView.getUserStats, name='getUserStats'),
    path('<int:id>/stats/count/',StatsView.countUserStats, name='countUserStats'),
  

]
