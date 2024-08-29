from rest_framework import serializers
from ..Models.GraphModel import Graph

class GraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = Graph
        fields = ['label', 'value']
