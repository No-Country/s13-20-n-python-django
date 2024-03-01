from django.urls import path
from .views import (
    ProjectCreateView,
    ProjectDeleteView,
    ProjectListView,
    ProjectRetrieveView,
    ProjectUpdateView,
    BoardCreateView,
    BoardDeleteView,
    BoardListView,
    BoardUpdateView,
    BoardRetrieveView,
)

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("projects/<id>", ProjectRetrieveView.as_view(), name="project-retrieve"),
    path("projects/update/<id>", ProjectUpdateView.as_view(), name="project-update"),
    path("projects/create/", ProjectCreateView.as_view(), name="project-create"),
    path("projects/delete/<id>", ProjectDeleteView.as_view(), name="project-delete"),
    path("boards/", BoardListView.as_view(), name="board-list"),  # won't be used
    path("boards/<id>", BoardRetrieveView.as_view(), name="board-retrieve"),
    path("boards/update/<id>", BoardUpdateView.as_view(), name="board-update"),
    path("boards/create/<id>", BoardCreateView.as_view(), name="board-update"),
    path("boards/delete/<id>", BoardDeleteView.as_view(), name="board-destroy"),
]
