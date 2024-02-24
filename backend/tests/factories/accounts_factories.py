from faker import Faker
from accounts.models import User

faker = Faker('es_AR')

class AccountsFactory:

    def build_accounts_JSON(self):
        return {
            "first_name" : faker.first_name(),
            "last_name" : faker.last_name(),
            "username" : faker.username(),
            "email" : faker.email(),
            "password": "contraseña"
        }
    
    def create_account(self):
        return User.objects.create(**self.build_accounts_JSON())