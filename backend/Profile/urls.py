from django.urls import path
from .import views

urlpatterns = [
    path('',views.getAllUsersProfile, name='getAllUsersProfile'),
    path('count/',views.countUsersProfile, name='getAllUsersProfile'),
    path('<int:id>/',views.Get_UserProfile_Data_With_id, name='Get_UserProfile_Data_With_id'),


    path('prData/',views.Get_UserProfile_Data, name='Get_UserProfile_Data'),
    path('EditProfile/<int:id>/',views.EditProfile, name='EditProfile'),
]
