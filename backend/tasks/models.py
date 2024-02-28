from accounts.models import User
from django.db import models
from django.utils.translation import gettext_noop
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_noop
import os
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
    order = models.IntegerField(default=0)
    name = models.CharField(max_length=255, blank=True)
    description = models.TextField(max_length=255, blank=True)
    created_time = models.DateTimeField(auto_now_add=True)
    expired_time = models.DateTimeField()
    priority = models.IntegerField(choices=Priority.choices, default=1)
 
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        # Check if the Task instance is newly created
        if self.pk is None:
            # Get the maximum order value from existing tasks in the same list
            max_order = Task.objects.filter(list=self.list).aggregate(models.Max('order'))['order__max'] or 0

            # Set the order for this new task to be one greater than the maximum
            self.order = max_order + 1

        super().save(*args, **kwargs)


 

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
    
    
def validate_file_extension(value):
 
    allowed_extensions = ('.pdf', '.docx', '.xlsx', '.txt', '.zip')
    extension = os.path.splitext(value.name)[1].lower()
    if extension not in allowed_extensions:
        raise ValidationError(
            gettext_noop(
                'Solo los archivos con las siguientes extensiones estan permitidos: {}'
            ).format(', '.join(allowed_extensions))
        )

class File(models.Model):
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_file", blank=True
    )
    file = models.FileField(upload_to='files/', validators=[validate_file_extension])

    def clean(self):
 
        super().clean()
 
        
        return self