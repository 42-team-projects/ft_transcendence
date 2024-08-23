from rest_framework import serializers
from .models import Member

class MemeberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'username', 'age']
    