from django.shortcuts import render

# Create your views here.


def receive(request):
    return (render(request, 'notification/receive.html'))


def send(request):
    return (render(request, 'notification/send.html'))