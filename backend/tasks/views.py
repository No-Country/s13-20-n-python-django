from rest_framework.permissions import IsAuthenticated

from .mixins import FilterByUserMixin
from .permissions import (
    BoardUserIsProjectOwnerOrReadOnly,
    IsOwnerOrReadOnly,
    ListUserIsProjectMemberOrReadOnly,
)
from .models import Project, List, Board, Task
from .serializers import (
    ListSerializer,
    ProjectSerializer,
    DetailProjectSerializer,
    BoardSerializer,
    DetailBoardSerializer,
)
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from accounts.models import User


class ProjectListView(FilterByUserMixin, ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    user_field = "owner"


class ProjectCreateView(CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDeleteView(DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    user_field = "owner"


class ProjectRetrieveView(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = DetailProjectSerializer


class ProjectUpdateView(UpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]
    user_field = "owner"


class BoardRetrieveView(RetrieveAPIView):
    queryset = Board.objects.all()
    serializer_class = DetailBoardSerializer


class BoardListView(ListAPIView):
    # Este endpoint no se va a usar, los projectos ya traen todos los boards
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class BoardCreateView(CreateAPIView):
    queryset = Board.objects.select_related("project")
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated, BoardUserIsProjectOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BoardUpdateView(UpdateAPIView):
    queryset = Board.objects.select_related("project")
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated, BoardUserIsProjectOwnerOrReadOnly]


class BoardDeleteView(DestroyAPIView):
    queryset = Board.objects.select_related("project")
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated, BoardUserIsProjectOwnerOrReadOnly]


class ListCreateView(CreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [IsAuthenticated, ListUserIsProjectMemberOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ListDeleteView(DestroyAPIView):
    queryset = List.objects.prefetch_related("board__project")
    serializer_class = ListSerializer
    permission_classes = [IsAuthenticated, ListUserIsProjectMemberOrReadOnly]


class ListUpdateView(UpdateAPIView):
    queryset = List.objects.prefetch_related("board__project")
    serializer_class = ListSerializer
    permission_classes = [IsAuthenticated, ListUserIsProjectMemberOrReadOnly]


class ListRetrieveView(RetrieveAPIView):
    # unlikely to be used
    queryset = List.objects.prefetch_related("board__project")
    serializer_class = ListSerializer
    permission_classes = [IsAuthenticated, ListUserIsProjectMemberOrReadOnly]


# @permission_classes([IsAuthenticated])
# class ListProject(viewsets.ModelViewSet):
#     @extend_schema(
#         description="Lista todas las listas necesitas mandarle el id del board al que pertece la lista",
#         summary="Lists",
#         request=ListSerializer,
#         responses={200: ListSerializer},
#     )
#     def list(self, request, pk):
#         board = Board.objects.filter(id=pk)
#         if not board.exists():
#             return Response(
#                 {"error": "Aun no existe un board para ese proyecto"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         lists = ListTask.objects.filter(board_id=pk)

#         if not lists.exists():
#             return Response(
#                 {"error": "El identificador no pertenece a ningun board"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         serializer = ListSerializer(lists, many=True)
#         return Response(serializer.data)

#     @extend_schema(
#         description="Crea una nueva lista necesitas mandar el id del board al que pertece la lista",
#         summary="Lists",
#         request=ListSerializer,
#         responses={201: ListSerializer},
#     )
#     def create(self, request, pk):

#         board = Board.objects.filter(id=pk)

#         data = request.data
#         serializer = ListSerializer(data=data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         new_list = ListTask(
#             board_id=pk, user_id=board[0].user_id, **serializer.validated_data
#         )
#         new_list.save()

#         serializer = ListSerializer(new_list)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# @permission_classes([IsAuthenticated])
# class TaskProject(viewsets.ModelViewSet):
#     @extend_schema(
#         description="Lista todas las tareas necesitas mandarle el id de la lista al que pertece la tarea",
#         summary="Tasks",
#         request=TaskSerializer,
#         responses={200: TaskSerializer},
#     )
#     def list(self, request, pk):
#         list = ListTask.objects.filter(id=pk)
#         if not list.exists():
#             return Response(
#                 {"error": "no hay ninguna lista asociada a ese board"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         task = Task.objects.filter(list_id=pk)

#         if not task.exists():
#             return Response(
#                 {"error": "El identificador no pertenece a ninguna tarea"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         serializer = TaskSerializer(task, many=True)
#         return Response(serializer.data)

#     @extend_schema(
#         description="Crea una nueva tarea necesitas mandar el id de la lista al que pertece la tarea",
#         summary="Lists",
#         request=TaskSerializer,
#         responses={201: TaskSerializer},
#     )
#     def create(self, request, pk):

#         list = ListTask.objects.filter(id=pk)
#         if not list.exists():
#             return Response(
#                 {"error": "no hay ninguna lista asociada a ese board"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         data = request.data
#         serializer = TaskSerializer(data=data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         task = Task(list_id=pk, user_id=request.user.id, **serializer.validated_data)
#         task.save()

#         serializer = TaskSerializer(task)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
