from tortoise import fields
from tortoise.models import Model

class User(Model):
    id=fields.IntField(pk=True)
    username=fields.CharField(max_length=50)
    email=fields.CharField(unique=True,max_length=40)
    password=fields.CharField(max_length=80)
    
    
    def __str__(self):
        return self.username
    