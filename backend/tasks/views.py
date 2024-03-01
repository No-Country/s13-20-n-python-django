from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Project, ListTask, Board, Task
from .serializers import (
    ProjectSerializer,
    ListSerializer,
    BoardSerializer,
    TaskSerializer,
)
from drf_spectacular.utils import extend_schema
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListCreateAPIView
from accounts.models import User


# @permission_classes([IsAuthenticated])

# class ProjectList(viewsets.ModelViewSet):

#     @extend_schema(description="Crea un nuevo proyecto", summary="Projects",
#                    request=ProjectSerializer, responses={201 : ProjectSerializer},
#        )

#     def create(self, request):
#         serializer = ProjectSerializer(data=request.data)

#         if serializer.is_valid():
#             project = serializer.save()
#             ProjectMember.objects.create(
#                 project=project,
#                 user=request.user,
#                 role='owner'
#             )
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     @extend_schema(description="Lista todos los proyecto", summary="Projects",
#                    request=ProjectSerializer, responses={200 : ProjectSerializer},
#                    )
#     def list(self, request):

#         project_ids = ProjectMember.objects.filter(user=request.user).values_list('project_id', flat=True)
#         projects = Project.objects.filter(id__in=project_ids)
#         serializer = ProjectSerializer(projects, many=True)
#         return Response(serializer.data)


class ProjectListCreate(ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user)


# @permission_classes([IsAuthenticated])
# class ProjectDetail(viewsets.ModelViewSet):

#     @extend_schema(
#         description="Lista el detalle de un proyecto",
#         summary="Projects",
#         request=ProjectSerializer,
#         responses={200: ProjectSerializer},
#     )
#     def retrieve(self, request, pk):

#         try:
#             project = Project.objects.get(pk=pk)
#         except Project.DoesNotExist:
#             return Response(
#                 {"error": "Projecto no encontrado"}, status=status.HTTP_404_NOT_FOUND
#             )
#         serializer = ProjectSerializer(project)
#         return Response(serializer.data)

#     @extend_schema(
#         description="Actualiza un proyecto",
#         summary="Projects",
#         request=ProjectSerializer,
#         responses={200: ProjectSerializer},
#     )
#     def update(self, request, pk):

#         try:
#             project = Project.objects.get(pk=pk)
#         except Project.DoesNotExist:
#             return Response(
#                 {"error": "Projecto no encontrado"}, status=status.HTTP_404_NOT_FOUND
#             )

#         if project.user == request.user:
#             serializer = ProjectSerializer(project, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         return Response(
#             {"error": "Solo el dueño del proyecto puede actualizar este recurso"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     @extend_schema(
#         description="Eliminar un proyecto",
#         summary="Projects",
#         request=ProjectSerializer,
#         responses={204: ProjectSerializer},
#     )
#     def destroy(self, request, pk):
#         try:
#             project = Project.objects.get(pk=pk)
#         except Project.DoesNotExist:
#             return Response(
#                 {"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND
#             )
#         if project.user == request.user:
#             project.delete()
#             return Response(
#                 {"message": "El proyecto ha sido borrado exitosamente"},
#                 status=status.HTTP_204_NO_CONTENT,
#             )
#         return Response(
#             {"error": "Solo el dueño del proyecto puede eliminar este recurso"},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     @extend_schema(
#         description="Asigna un usuario al proyecto",
#         summary="Projects",
#         request=ProjectSerializer,
#         responses={201: ProjectSerializer},
#     )
#     def create(self, request, pk):
#         try:
#             project = Project.objects.get(pk=pk)
#             serializer = UserProjectRoleSerializer(data=request.data)

#             if serializer.is_valid():
#                 email = serializer.validated_data["email"]
#                 user = User.objects.filter(
#                     email=email
#                 ).first()  # Buscar usuario por correo electrónico
#                 if user is None:
#                     return Response(
#                         {"message": "Usuario no encontrado"},
#                         status=status.HTTP_404_NOT_FOUND,
#                     )
#                 member, created = ProjectMember.objects.get_or_create(
#                     project=project, user=user
#                 )
#                 member.role = serializer.validated_data["role"]
#                 member.save()
#                 return Response(
#                     {"message": "Usuario asignado exitosamente"},
#                     status=status.HTTP_201_CREATED,
#                 )
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Project.DoesNotExist:
#             return Response(
#                 {"message": "Proyecto no encontrado"}, status=status.HTTP_404_NOT_FOUND
#             )


# @permission_classes([IsAuthenticated])
# class BoardProject(viewsets.ModelViewSet):
#     @extend_schema(
#         description="Lista todos los boards de un proyecto necesitas mandarle el id del proyecto al que pertece el board",
#         summary="Boards",
#         request=BoardSerializer,
#         responses={200: BoardSerializer},
#     )
#     def list(self, request, pk):

#         project = Project.objects.filter(id=pk)

#         if not project.exists():
#             return Response(
#                 {"error": "El identificador no pertenece a ningun proyecto"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )
#         board = Board.objects.filter(project_id=pk)
#         if not board.exists():
#             return Response(
#                 {"error": "Aun no existe un board para ese proyecto"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         serializer = BoardSerializer(board, many=True)
#         return Response(serializer.data)

#     @extend_schema(
#         description="Crea un nuevo board necesitas mandar el id del proyecto al que pertece el board",
#         summary="Boards",
#         request=BoardSerializer,
#         responses={201: BoardSerializer},
#     )
#     def create(self, request, pk):
#         project = Project.objects.filter(id=pk)

#         if not project.exists():
#             return Response(
#                 {"error": "El identificador no pertenece a ningun proyecto"},
#                 status=status.HTTP_404_NOT_FOUND,
#             )

#         data = request.data
#         serializer = BoardSerializer(data=data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         new_list = Board(
#             project_id=pk, user_id=project[0].user_id, **serializer.validated_data
#         )

#         new_list.save()

#         serializer = BoardSerializer(new_list)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


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
