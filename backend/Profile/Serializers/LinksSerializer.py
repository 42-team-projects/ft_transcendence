from rest_framework import serializers
from ..Models.LinksModel import Links

class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ['title', 'url']