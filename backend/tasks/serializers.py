from rest_framework import serializers
from .models import Project, ListTask, Task, Comment,Board,ProjectMember
from accounts.models import User
from django.contrib.auth import get_user_model


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ["user", "content", "created_time"]


# class FileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = File
#         fields = ["file"]


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    
    # file = FileSerializer(source="task_file", many=False)
    # comment = serializers.SerializerMetaclass(read_only=True)

    class Meta:
        model = Task
        fields = [
            "user",
            "order",
            "name",
            "description",
            "expired_time",
            "priority",
          

            "assigned_user"
        ]

    def get_comment(self, obj):
        comment = obj.task_comment.all()
        serializer = CommentSerializer(comment, many=True)
        return serializer.data


class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    board =  serializers.ReadOnlyField(source="board.name")   
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = ListTask
        fields = ["title", "board", "user","tasks"]
    def get_tasks(self, obj):
        tasks = obj.tasks.all()
        return TaskSerializer(tasks, many=True).data

class BoardSerializer(serializers.ModelSerializer):
 
    project = serializers.ReadOnlyField(source="project.name")
    user = serializers.ReadOnlyField(source="user.username")
    class Meta:
        model = Board
        fields = ["name","user","project", "description"]
        



class ProjectSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Project
        fields = [ "name"]
 
    
class UserProjectRoleSerializer(serializers.Serializer):
    email = serializers.EmailField()
    role = serializers.ChoiceField(choices=ProjectMember.ROLE_CHOICES)

    def validate(self, attrs):
        email = attrs['email']
        user = User.objects.filter(email=email).first()

        if user is None:
            raise serializers.ValidationError('Usuario no encontrado')

        attrs['user'] = user  # Add validated user object to serialized data
        return attrs