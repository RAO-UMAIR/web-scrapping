from tortoise.contrib.fastapi import register_tortoise
from tortoise import Tortoise

def init_db(app):
    register_tortoise(
        app,
        db_url="postgres://postgres:postgres@localhost:5433/scrapping",
        modules={"models": ["models.user","models.product", "aerich.models"]},  
        generate_schemas=True,
        add_exception_handlers=True,
    )

    Tortoise.init_models(["models.user"], "models")


TORTOISE_ORM = {
    "connections": {
        "default": "postgres://postgres:postgres@localhost:5433/scrapping"
    },
    "apps": {
        "models": {
            "models": ["models.user","models.product",  "aerich.models"],
            "default_connection": "default",
        }
    }
}
