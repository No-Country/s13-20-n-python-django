from accounts.api.serializers import (
    UserListSerializer,
    UserSerializer,
    UserUpdateSerializer,
)
from accounts.models import User
from django.contrib.auth.hashers import make_password
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .permissions import CreateUserPermission


class UserModelViewSet(GenericViewSet):
    serializer_class = UserSerializer
    list_serializer_class = UserListSerializer
    queryset = serializer_class.Meta.model.objects.filter(is_active=True).order_by(
        "last_name"
    )
    permission_classes = [CreateUserPermission]

    @extend_schema(description="Crea un usuario", summary="Users")
    def create(self, request):
        """
        Create an user
        """

        data = request.data
        user_data = {
            "first_name": data.get("first_name"),
            "last_name": data.get("last_name"),
            "username": data.get("username"),
            "email": data.get("email"),
            "password": make_password(data.get("password")),
            "is_active": data.get("is_active"),
            "is_staff": data.get("is_staff"),
            "is_superuser": data.get("is_superuser"),
            "image_url": data.get("image_url"),
        }

        user_serializer = self.serializer_class(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()

            return Response(
                {
                    "message": "El usuario se creo correctamente!",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "message": "Hay errores en el registro!",
                "errors": user_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @extend_schema(
        description="Obtiene la lista de todos los usuarios", summary="Users"
    )
    def list(self, request):
        """
        Get a collection of users
        """
        queryset = self.serializer_class.Meta.model.objects.all()
        serializer = self.list_serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(description="Obtiene el detalle de un usuario", summary="Users")
    def retrieve(self, request, pk=None):
        """
        Get a detail of user
        """
        user = get_object_or_404(self.serializer_class.Meta.model, pk=pk)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    @extend_schema(description="Actualiza un usuario", summary="Users")
    def update(self, request, pk=None):
        """
        Update an user
        """
        user = get_object_or_404(self.serializer_class.Meta.model, pk=pk)
        serializer = UserUpdateSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Usuario actualizado correctamente!"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "message": "Hay errores en la actualización!",
                "error": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    @extend_schema(description="Elimina un usuario de manera logica", summary="Users")
    def destroy(self, request, pk=None):
        """
        Delete an user in logical mode
        """
        user = self.serializer_class.Meta.model.objects.filter(id=pk).update(
            is_active=False
        )
        if user:
            return Response(
                {"message": "Usuario eliminado correctamente"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "El usuario no existe"}, status=status.HTTP_404_NOT_FOUND
        )
