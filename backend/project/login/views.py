from django.shortcuts import render
from django.http import HttpResponse



# Create your views here.

def index(request):
    return HttpResponse("Dashboard")


# use the static html file
def login(request):
    return render(request, 'login.html')