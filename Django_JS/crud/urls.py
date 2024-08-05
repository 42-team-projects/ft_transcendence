from django.urls import path
from . import views

urlpatterns = [
    path('', views.Get_Post_Methods, name='Get_Post'),
    path('<int:id>/', views.Put_Delete_Methods, name='Put_Delete'),
]