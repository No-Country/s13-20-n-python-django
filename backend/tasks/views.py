from accounts.models import User
from django.db.models import Q
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated

from .models import Board, List, Project, Task
from .permissions import (
    BoardUserIsProjectOwnerOrReadOnly,
    ListUserIsProjectMemberOrReadOnly,
    ProjectIsOwnerOrReadOnly,
    TaskUserIsProjectMemberOrReadOnly,
)
from .serializers import (
    BoardSerializer,
    DetailBoardSerializer,
    DetailProjectSerializer,
    ListSerializer,
    ProjectSerializer,
    TaskSerializer,
)


class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    user_field = "owner"

    def get_queryset(self):
        return (
            super()
            .get_queryset()
            .filter(Q(owner=self.request.user) | Q(member=self.request.user))
        )


class ProjectCreateView(CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProjectDeleteView(DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, ProjectIsOwnerOrReadOnly]
    user_field = "owner"


class ProjectRetrieveView(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = DetailProjectSerializer


class ProjectUpdateView(UpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, ProjectIsOwnerOrReadOnly]
    user_field = "owner"


class BoardRetrieveView(RetrieveAPIView):
    queryset = Board.objects.all()
    serializer_class = DetailBoardSerializer


class BoardListView(ListAPIView):
    # Este endpoint no se va a usar, los projectos ya traen todos los boards
    queryset = Board.objects.all()
    serializer_class = BoardSerializer


class BoardCreateView(CreateAPIView):
    queryset = Board.objects.all()
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


class TaskRetrieveView(RetrieveAPIView):
    # Unlikely to be used, unless TaskSerializer is changed to have less data
    queryset = Task.objects.prefetch_related("list__board__project")
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, TaskUserIsProjectMemberOrReadOnly]


class TaskCreateView(CreateAPIView):
    queryset = Task.objects.prefetch_related("list__board__project")
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, TaskUserIsProjectMemberOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TaskUpdateView(UpdateAPIView):
    queryset = Task.objects.prefetch_related("list__board__project")
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, TaskUserIsProjectMemberOrReadOnly]


class TaskDeleteView(DestroyAPIView):
    queryset = Task.objects.prefetch_related("list__board__project")
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, TaskUserIsProjectMemberOrReadOnly]
