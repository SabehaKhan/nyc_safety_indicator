from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model
from .models import EmergencyContact

User = get_user_model()

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = ('id', 'user', 'name', 'phone_number', 'carrier')  
        extra_kwargs = {'user': {'read_only': True}}  
        
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')
        def update(self, instance, validated_data):
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.email = validated_data.get('email', instance.email)
            instance.save()
            return instance