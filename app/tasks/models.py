from django.db import models
from django.utils.translation import gettext_noop
from accounts.models import User


class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255)


class Board(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, black=True)


class Milestone(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)


class List(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True)
    order = models.IntegerField()


class Task(models.Model):
    class Priority(models.IntegerChoices):
        NOT_IMPORTANT = 1, gettext_noop("NOT_IMPORTANT")
        IMPORTANT = 2, gettext_noop("IMPORTANT")
        DELEGATE = 3, gettext_noop("DELEGATE")
        URGENT = 4, gettext_noop("URGENT")

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, null=True)
    order = models.IntegerField(defauld=1)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, black=True)
    created_time = models.DateTimeField(auto_now_add=True)
    expired_time = models.DateTimeField()
    priority = models.IntegerField(choices=Priority.choices, default=1)

    def __str__(self):
        return self.name


class File(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=True)
    file = models.ImageField(blank=True)


class MilestoneTask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, null=True)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, blank=True)
    content = models.CharField(max_length=255, black=True)
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
