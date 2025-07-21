from tortoise import fields
from tortoise.models import Model

class Product(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    price = fields.CharField(max_length=50)
    image_url = fields.CharField(max_length=500, null=True)
    link = fields.CharField(max_length=500, unique=True)
    rating = fields.CharField(max_length=10, null=True)
    reviews = fields.CharField(max_length=10, null=True)
    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "products"
    