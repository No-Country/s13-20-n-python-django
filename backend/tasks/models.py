from accounts.models import User
from django.db import models
from django.utils.translation import gettext_noop
from django.utils import timezone

class Project(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_project", null=True
    )
    name = models.CharField(max_length=255)


class Board(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_board"
    )
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_board", null=True
    )
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)


class ListTask(models.Model):
    board = models.ForeignKey(
        Board, on_delete=models.CASCADE, related_name="board_project", null=True
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_tasks", null=True
    )

    title = models.CharField(max_length=255, blank=True)
    createdAt = models.DateTimeField(default=timezone.now)
    updatedAt = models.DateTimeField(default=timezone.now)


class Task(models.Model):
    class Priority(models.IntegerChoices):
        NOT_IMPORTANT = 1, gettext_noop("NOT_IMPORTANT")
        IMPORTANT = 2, gettext_noop("IMPORTANT")
        DELEGATE = 3, gettext_noop("DELEGATE")
        URGENT = 4, gettext_noop("URGENT")

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_task", null=True
    )
    assigned_user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="assigned_tasks", null=True
    )
    list = models.ForeignKey(
        ListTask, on_delete=models.CASCADE, related_name="list_task", null=True
    )
    order = models.IntegerField(default=1)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    expired_time = models.DateTimeField()
    priority = models.IntegerField(choices=Priority.choices, default=1)
    file = models.ImageField(blank=True)
    def __str__(self):
        return self.name


 

class Milestone(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_milestone"
    )
    complete = models.BooleanField(default=False)
    tasks = models.ManyToManyField(
        Task,
        related_name="task_milestone",
    )


class Comment(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_comment", null=True
    )
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_comment", blank=True
    )
    content = models.CharField(max_length=255, blank=True)
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
