from rest_framework import serializers
from .models import Project, Board, List, Task, File, MilestoneTask, Comment


class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Project
        fields = ["user", "name"]


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ["user", "content", "created_time"]


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ["file"]


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    file = FileSerializer(source="task_file", many=False)
    comment = serializers.SerializerMetaclass(read_only=True)

    class Meta:
        model = Task
        fields = [
            "user",
            "order",
            "name",
            "description",
            "expired_time",
            "priority",
            "file",
            "comment",
        ]

    def get_comment(self, obj):
        comment = obj.task_comment.all()
        serializer = CommentSerializer(comment, many=True)
        return serializer.data


class ListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(source="list_task", many=True)

    class Meta:
        model = List
        fields = ["title", "order", "tasks"]


class BoardSerializer(serializers.ModelSerializer):
    lists = ListSerializer(source="board_list", many=True)

    class Meta:
        model = Board
        fields = ["name", "description", "lists"]


class MilestoneTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = MilestoneTask
        fields = ["task", "milstone"]
