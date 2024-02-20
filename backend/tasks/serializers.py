from rest_framework import serializers
from .models import Project, Board, List, Task, File, Milestone, MilestoneTask, Comment


class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Project
        fields = ["user", "name"]


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Task
        fields = ["user", "order", "name", "description", "expired_time", "priority"]


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


class FileSerializer(serializers.ModelSerializer):
    task = serializers.ReadOnlyField(many=False)

    class Meta:
        model = File
        fields = ["task", "file"]


# class MilestoneSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Milestone
#        fields = "__all__"


class MilestoneTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = MilestoneTask
        fields = ["task", "milstone"]


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ["user", "content", "created_time"]
