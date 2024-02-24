from accounts.models import User
from django.db import models
from django.utils.translation import gettext_noop


class Project(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_project", null=True
    )
    name = models.CharField(max_length=255)


class Board(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_board"
    )
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)


class Milestone(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)


class List(models.Model):
    board = models.ForeignKey(
        Board, on_delete=models.CASCADE, related_name="board_list"
    )
    title = models.CharField(max_length=255, blank=True)
    order = models.IntegerField()


class Task(models.Model):
    class Priority(models.IntegerChoices):
        NOT_IMPORTANT = 1, gettext_noop("NOT_IMPORTANT")
        IMPORTANT = 2, gettext_noop("IMPORTANT")
        DELEGATE = 3, gettext_noop("DELEGATE")
        URGENT = 4, gettext_noop("URGENT")

    user = models.ForeignKey(
        User, on_delete=models.SET_NULL, related_name="user_task", null=True
    )
    list = models.ForeignKey(
        List, on_delete=models.CASCADE, related_name="list_task", null=True
    )
    order = models.IntegerField(default=1)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    expired_time = models.DateTimeField()
    priority = models.IntegerField(choices=Priority.choices, default=1)

    def __str__(self):
        return self.name


class File(models.Model):
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_file", blank=True
    )
    file = models.ImageField(blank=True)


class Milestone(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project_milestone"
    )
    complete = models.BooleanField(default=False)
    tasks = models.ManyToManyField(
        Task,
        through="MilestoneTask",
        related_name="task_milestone",
        through_fields=("milestone", "task"),
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
