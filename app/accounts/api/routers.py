from rest_framework.routers import DefaultRouter
from accounts.api.viewsets import ProfileModelViewSet

routers = DefaultRouter()
routers.register("profiles", ProfileModelViewSet, basename="profile")
urlpatterns = routers.urls