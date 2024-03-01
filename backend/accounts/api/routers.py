from accounts.api.viewsets import UserModelViewSet
from rest_framework.routers import DefaultRouter

routers = DefaultRouter()
routers.register("user", UserModelViewSet, basename="user")
urlpatterns = routers.urls
