from django.urls import path
from .import views

urlpatterns = [
    path('/',views.getAllUsersProfile, name='getAllUsersProfile'),
    path('prData/',views.Get_UserProfile_Data, name='Get_UserProfile_Data'),
    path('EditProfile/<int:id>/',views.EditProfile, name='EditProfile'),
    path('prData/<int:id>/',views.Get_UserProfile_Data_With_id, name='Get_UserProfile_Data_With_id')
]
