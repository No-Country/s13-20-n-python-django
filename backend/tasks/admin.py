from django.contrib import admin
from .models import *

admin.site.register(Project)
admin.site.register(Board)
admin.site.register(List)
admin.site.register(Task)
# admin.site.register(File)
admin.site.register(Milestone)
admin.site.register(Comment)
