from rest_framework.test import APITestCase
from accounts.models import User
from rest_framework import status

class TestSetUp(APITestCase):
    
    def setUp(self):
        
        self.user = User.objects.create_superuser(
            email="user_test@mail.com",
            password="contraseña",
        )
        
        self.login_url = "/api-jwt/token/"

        response = self.client.post(
            self.login_url,
            {
                "email":self.user.email,
                "password":"contraseña"
            },
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.token = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.token)
        return super().setUp()
    
    