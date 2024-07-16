from django.shortcuts import render
from django.http import HttpResponse


def first_backend(request):
    return HttpResponse('Hello, World!')
# Create your views here.
