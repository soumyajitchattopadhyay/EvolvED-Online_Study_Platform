from rest_framework import serializers
from .models import StudyGroup
from users.serializers import UserSerializer

class StudyGroupSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)  # Include creator details
    members = UserSerializer(many=True, read_only=True)  # Include members' details

    class Meta:
        model = StudyGroup
        fields = ['id', 'name', 'description', 'created_by', 'members']
