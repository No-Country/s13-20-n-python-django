from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Project,ListTask,Board,Task
from .serializers import ProjectSerializer,ListSerializer,BoardSerializer,TaskSerializer
 
from rest_framework.decorators import permission_classes

@permission_classes([IsAuthenticated])

class ProjectList(viewsets.ModelViewSet):
 
    def listAll(self, request):
       
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)
 
    def createOne(self, request):
    
        serializer = ProjectSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

@permission_classes([IsAuthenticated])
class ProjectDetail(viewsets.ModelViewSet):
    def listOne(self, request, pk):
 
        try:
            project = Project.objects.get(pk = pk)
        except Project.DoesNotExist:
            return Response({"error": "Projecto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
   

    def updateOne(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response({"error": "Projecto no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        if(project.user == request.user) :
            serializer = ProjectSerializer(project, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error":"Solo el dueño del proyecto puede actualizar este recurso"}, status=status.HTTP_400_BAD_REQUEST)
 

    def deleteOne(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response({"error": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
        if(project.user == request.user) :
            project.delete()
            return Response({"message": "El proyecto ha sido borrado exitosamente"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"error":"Solo el dueño del proyecto puede eliminar este recurso"}, status=status.HTTP_400_BAD_REQUEST)
 
 
@permission_classes([IsAuthenticated])

class BoardProject(viewsets.ModelViewSet):
    def listAll(self, request, pk):
    
        project = Project.objects.filter(id = pk)

        if not project.exists():
            return Response({'error': 'El identificador no pertenece a ningun proyecto'}, status=status.HTTP_404_NOT_FOUND)
        board = Board.objects.filter(project_id = pk)
        if not board.exists():
            return Response({'error': 'Aun no existe un board para ese proyecto'}, status=status.HTTP_404_NOT_FOUND)
   
        serializer = BoardSerializer(board, many=True)
        return Response(serializer.data)
 
    def createOne(self, request, pk):
        project = Project.objects.filter(id = pk)

        if not project.exists():
            return Response({'error': 'El identificador no pertenece a ningun proyecto'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        serializer = BoardSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        new_list = Board(project_id=pk, user_id=project[0].user_id,**serializer.validated_data)
         
        new_list.save()

        serializer = BoardSerializer(new_list)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@permission_classes([IsAuthenticated])

class ListProject(viewsets.ModelViewSet):
    
    def listAll(self, request, pk):
        board = Board.objects.filter(id = pk)
        if not board.exists():
            return Response({'error': 'Aun no existe un board para ese proyecto'}, status=status.HTTP_404_NOT_FOUND)
   
        lists = ListTask.objects.filter(board_id=pk)

        if not lists.exists():
            return Response({'error': 'El identificador no pertenece a ningun board'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ListSerializer(lists, many=True)
        return Response(serializer.data)
 
    def createOne(self, request, pk):
 
        board = Board.objects.filter(id = pk)

        data = request.data
        serializer = ListSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
        new_list = ListTask(board_id=pk, user_id=board[0].user_id, **serializer.validated_data)
        new_list.save()

        serializer = ListSerializer(new_list)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
@permission_classes([IsAuthenticated])

class TaskProject(viewsets.ModelViewSet):
    def listAll(self, request, pk):
        list = ListTask.objects.filter(id = pk)
        if not list.exists():
            return Response({'error': 'no hay ninguna lista asociada a ese board'}, status=status.HTTP_404_NOT_FOUND)

        task = Task.objects.filter(list_id=pk)

        if not task.exists():
            return Response({'error': 'El identificador no pertenece a ninguna tarea'}, status=status.HTTP_404_NOT_FOUND)

        serializer = TaskSerializer(task, many=True)
        return Response(serializer.data)
    
    def createOne(self, request, pk):
 
        list = ListTask.objects.filter(id = pk)
        if not list.exists():
            return Response({'error': 'no hay ninguna lista asociada a ese board'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        serializer = TaskSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
        task = Task(list_id=pk,user_id=request.user.id, **serializer.validated_data)
        task.save()

        serializer = TaskSerializer(task)
        return Response(serializer.data, status=status.HTTP_201_CREATED)