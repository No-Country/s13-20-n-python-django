from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from .api.serializers import TokenObtainSerializer

from rest_framework_simplejwt.views import TokenObtainPairView


class Login(TokenObtainPairView):
    serializer_class = TokenObtainSerializer

    @extend_schema(description="Inicio de sesion con token", summary="Users")
    def post(self, request, *arg, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                return Response(
                    {
                        "refresh": login_serializer.validated_data.get("refresh"),
                        "access": login_serializer.validated_data.get("access"),
                        "message": "Successful login",
                        "username": user.username,
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"error": "Incorrect password or email"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"error": "Incorrect password or email"},
            status=status.HTTP_400_BAD_REQUEST,
        )
