from rest_framework.routers import DefaultRouter
from accounts.api.viewsets import UserModelViewSet

routers = DefaultRouter()
routers.register("", UserModelViewSet, basename="user")
urlpatterns = routers.urls