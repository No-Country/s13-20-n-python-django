from django.urls import path
from .views import (
    ProjectCreateView,
    ProjectDeleteView,
    ProjectListView,
    ProjectRetrieveView,
    ProjectUpdateView,
)

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path(f"projects/<id>", ProjectRetrieveView, name="project-retrieve"),
    path("projects/update/<id>", ProjectUpdateView.as_view(), name="project-update"),
    path("projects/create/", ProjectCreateView.as_view(), name="project-list-create"),
    path(
        "projects/delete/<id>", ProjectDeleteView.as_view(), name="project-list-create"
    ),
]
