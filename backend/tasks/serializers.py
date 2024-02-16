from rest_framework import serializers
from .models import Project, Board, List, Task, File, Milestone, MilestoneTask, Comment


class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Project
        fields = ["user", "name"]


class BoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = Board
        fields = "__all__"

    pass


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = "__all__"

    pass


class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Task
        fields = "__all__"

    pass


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

    pass


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = "__all__"

    pass


class MilestoneTaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = MilestoneTask
        fields = "__all__"

    pass


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ["user", "content", "created_time"]
