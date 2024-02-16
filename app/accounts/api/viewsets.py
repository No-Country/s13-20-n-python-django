from rest_framework.viewsets import ModelViewSet
from accounts.api.serializers import UserSerializer

class UserModelViewSet(ModelViewSet):
    serializer = UserSerializer
    
def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all().order_by(
            "last_name"
        )