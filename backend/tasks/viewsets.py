from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .serializers import BoardSerializer, BoardCreateSerializer
from .models import Board

class BoardGenericViewSet(GenericViewSet):
    queryset = BoardSerializer.Meta.model.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    @extend_schema(description="Crea un tablero", summary="Tasks")
    def create(self, request):
        #Crea un nuevo tablero
        serializer = BoardCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
            "message":"El tablero se creo correctamente",
            "Board":serializer.data
        }, status=status.HTTP_201_CREATED)
        return Response({
            "message":"error en la creacion del tablero",
            "error":serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    

    """ def get_object(self):
        board_id = self.kwargs["board_id"]
        boar = Board.objects.filter(pk=board_id)

        return super().get_object() """