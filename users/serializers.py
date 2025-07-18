from rest_framework import serializers
from .models import User, Profile  

class UserSerializer(serializers.ModelSerializer):
    """ Serializer for the User model """
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class ProfileSerializer(serializers.ModelSerializer):
    """ Serializer for the Profile model """
    user = UserSerializer(read_only=True)  

    class Meta:
        model = Profile
        fields = '__all__'  