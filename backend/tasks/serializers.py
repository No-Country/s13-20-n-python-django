from rest_framework import serializers
from .models import Project, List, Task, Comment, Board
from accounts.models import User


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username"
    )

    class Meta:
        model = Comment
        fields = ["user", "content", "created_time"]


# class FileSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = File
#         fields = ["file"]


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    list = serializers.PrimaryKeyRelatedField(queryset=List.objects.all())
    assigned_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    # file = FileSerializer(source="task_file", many=False)
    # comment = serializers.SerializerMetaclass(read_only=True)

    class Meta:
        model = Task
        fields = [
            "user",
            "order",
            "name",
            "description",
            "priority",
            "assigned_user",
            "list",
            "id",
        ]
        read_only_fields = ["id"]
        ordering = ["order"]

    # para los comentarios es mejor usar otro serializer en otro endpoint
    def get_comment(self, obj):
        comment = obj.task_comment.all()
        serializer = CommentSerializer(comment, many=True)
        return serializer.data


class SummarizedBoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = ["name", "description", "id"]
        read_only_fields = ["name", "description", "id"]


class DetailProjectSerializer(serializers.ModelSerializer):
    project_board = SummarizedBoardSerializer(
        many=True
    )  # tiene que ser el related_name si se trata de una relacion inversa
    owner = serializers.SlugRelatedField(read_only=True, slug_field="username")
    member = serializers.SlugRelatedField(
        read_only=True, slug_field="username", many=True
    )

    class Meta:
        model = Project
        fields = ["name", "owner", "member", "project_board", "id"]
        read_only_fields = ["owner", "name", "member", "project_board", "id"]


class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    member = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", many=True
    )

    class Meta:
        model = Project
        fields = ["name", "owner", "member", "id"]
        read_only_fields = ["id"]


# Serializer de board para operaciones CRUD menos la de detail
class BoardSerializer(serializers.ModelSerializer):
    # La view se encarga del filtro por dueño con `self.request.user`. Asumimos que estamos trabajando con data limpia. Alternativamente podemos sobreescribir el __init__ y pasarle el objecto de la view al serializer para que se encargue de la logica.
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Board
        fields = ["name", "project", "user", "description"]


class ListSerializer(serializers.ModelSerializer):
    list_task = TaskSerializer(many=True, read_only=True)
    board = serializers.PrimaryKeyRelatedField(queryset=Board.objects.all())
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = List
        fields = ["title", "board", "user", "list_task", "id"]
        read_only_fields = ["id"]
        # ordering = ["order"] # si se añade orden a las listas


# Serializer de board para GET de detail
class DetailBoardSerializer(serializers.ModelSerializer):
    # La view se encarga del filtro por dueño con `self.request.user`. Asumimos que estamos trabajando con data limpia. Alternativamente podemos sobreescribir el __init__ y pasarle el objecto de la view al serializer para que se encargue de la logica.
    project = serializers.PrimaryKeyRelatedField(read_only=True)
    list_set = ListSerializer(many=True, read_only=True)
    user = serializers.SlugRelatedField(slug_field="username", read_only=True)

    class Meta:
        model = Board
        fields = ["name", "project", "user", "description", "list_set"]


# Los serializer no se encargan del filtrado. Eso es trabajo de los querysets. Si los querysets usan al objeto del usuario es mejor filtrar en el front.
