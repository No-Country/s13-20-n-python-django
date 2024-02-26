from rest_framework.routers import DefaultRouter
from .viewsets import BoardGenericViewSet

routers = DefaultRouter()

routers.register("board", BoardGenericViewSet, basename="board")
urlpatterns = routers.urls