from rest_framework import serializers
from .models import Project, List, Task, Comment, Board
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
            "assigned_user",
        ]
        ordering = ["order"]

    # para los comentarios es mejor usar otro serializer en otro endpoint
    def get_comment(self, obj):
        comment = obj.task_comment.all()
        serializer = CommentSerializer(comment, many=True)
        return serializer.data


# Used only for project
class SummarizedBoardSerializer(serializers.ModelSerializer):
    # project = serializers.StringRelatedField(many=True)

    class Meta:
        model = Board
        fields = ["name"]


class ProjectSerializer(serializers.ModelSerializer):
    project_board = SummarizedBoardSerializer(
        many=True
    )  # tiene que ser el related_name si se trata de una relacion inversa

    class Meta:
        model = Project
        fields = ["name", "owner", "member", "project_board"]
        read_only_fields = ["owner"]


# Serializer de board para operaciones CRUD menos la de detail
class BoardSerializer(serializers.ModelSerializer):
    # La view se encarga del filtro por dueño con `self.request.user`. Asumimos que estamos trabajando con data limpia. Alternativamente podemos sobreescribir el __init__ y pasarle el objecto de la view al serializer para que se encargue de la logica.
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Board
        fields = ["name", "project", "user", "description"]


class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    board = serializers.ReadOnlyField(source="board.name")
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = List
        fields = ["title", "board", "user", "tasks"]

    def get_tasks(self, obj):
        tasks = obj.tasks.all()
        return TaskSerializer(tasks, many=True).data


class BoardSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField(many=True)

    class Meta:
        model = Board
        fields = ["name", "description", "project"]


class ProjectSerializer(serializers.ModelSerializer):
    project_board = BoardSerializer(
        many=True
    )  # tiene que ser el related_name si se trata de una relacion inversa

    class Meta:
        model = Project
        fields = ["name", "owner", "member", "project_board"]
        read_only_fields = ["owner"]
