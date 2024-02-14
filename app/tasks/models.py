from django.db import models
from django.utils.translation import gettext_noop
from accounts.models import User


class Task(models.Model):
    class Priority(models.IntegerChoices):
        NOT_IMPORTANT = 1, gettext_noop("NOT_IMPORTANT")
        IMPORTANT = 2, gettext_noop("IMPORTANT")
        DELEGATE = 3, gettext_noop("DELEGATE")
        URGENT = 4, gettext_noop("URGENT")

    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    # list = models.ForeignKey(List, on_delete=models.SET_NULL, null=True)
    order = models.IntegerField(defauld=1)
    name = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=255, black=True)
    created_time = models.DateTimeField(auto_now_add=True)
    expired_time = models.DateTimeField()
    priority = models.IntegerField(choices=Priority.choices, default=1)

    def __str__(self):
        return self.name
