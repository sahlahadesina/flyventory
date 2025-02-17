from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# Serialization allows the data to be translated into a format that can be transmitted
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    # This creates a new user 
    # The serializer will check if the data is correct and if it is then it will perform the below function
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only":True}}
        