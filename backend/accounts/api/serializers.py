from accounts.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TokenObtainSerializer(TokenObtainPairSerializer):
    pass


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "image_url",
        ]
        extra_kwargs = {"password": {"write_only": True}}
        read_only_fields = [
            "is_active",
            "created",
            "update",
        ]

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email"]
        read_only_fields = [
            "created",
            "is_active",
            "update",
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "image_url"]
        read_only_fields = [
            "created",
            "is_active",
            "update",
        ]
