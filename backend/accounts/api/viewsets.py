from accounts.api.serializers import (
    UserListSerializer,
    UserCreateSerializer,
    UserUpdateSerializer,
)

from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status

from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .permissions import CreateUserPermission


class UserModelViewSet(GenericViewSet):
    serializer_class = UserCreateSerializer
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
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()

            return Response(
                {
                    "message": "The user was created successfully!",
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "message": "There are errors in the registry!",
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
                {"message": "User updated successfully!"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "message": "There are errors in the update!",
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
                {"message": "User successfully deleted"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "Username does not exist"}, status=status.HTTP_404_NOT_FOUND
        )
