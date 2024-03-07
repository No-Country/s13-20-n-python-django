from django.urls import path

from .views import (
    BoardCreateView,
    BoardDeleteView,
    BoardListView,
    BoardRetrieveView,
    BoardUpdateView,
    ListCreateView,
    ListDeleteView,
    ListRetrieveView,
    ListUpdateView,
    ProjectCreateView,
    ProjectDeleteView,
    ProjectListView,
    ProjectRetrieveView,
    ProjectUpdateView,
    TaskCreateView,
    TaskDeleteView,
    TaskRetrieveView,
    TaskUpdateView,
)

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("projects/<pk>/", ProjectRetrieveView.as_view(), name="project-retrieve"),
    path("projects/update/<pk>/", ProjectUpdateView.as_view(), name="project-update"),
    path("projects/create/", ProjectCreateView.as_view(), name="project-create"),
    path("projects/delete/<pk>/", ProjectDeleteView.as_view(), name="project-delete"),
    path("boards/", BoardListView.as_view(), name="board-list"),  # won't be used
    path("boards/<pk>/", BoardRetrieveView.as_view(), name="board-retrieve"),
    path("boards/update/<pk>/", BoardUpdateView.as_view(), name="board-update"),
    path("boards/create/", BoardCreateView.as_view(), name="board-update"),
    path("boards/delete/<pk>/", BoardDeleteView.as_view(), name="board-destroy"),
    path("lists/<pk>/", ListRetrieveView.as_view(), name="list-retrieve"),
    path("lists/update/<pk>/", ListUpdateView.as_view(), name="list-update"),
    path("lists/create/", ListCreateView.as_view(), name="list-create"),
    path("lists/delete/<pk>/", ListDeleteView.as_view(), name="list-delete"),
    path("tasks/<pk>/", TaskRetrieveView.as_view(), name="task-retrieve"),
    path("tasks/update/<pk>/", TaskUpdateView.as_view(), name="task-update"),
    path("tasks/create/", TaskCreateView.as_view(), name="task-create"),
    path("tasks/delete/<pk>/", TaskDeleteView.as_view(), name="task-delete"),
]
