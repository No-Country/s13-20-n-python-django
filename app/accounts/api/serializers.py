from rest_framework import serializers
from django.contrib.auth.models import User
from accounts.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "_all_"
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "_all_"       