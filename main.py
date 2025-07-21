from fastapi import FastAPI
from db_setup import init_db
from fastapi.middleware.cors import CORSMiddleware
from controllers import user_controller
from controllers import scrapper_controller


app=FastAPI()

init_db(app)

origins = [
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,           
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def greet():
    return("hello")

app.include_router(user_controller.router,  prefix="/api/user",tags=["USERS"])
app.include_router(scrapper_controller.router,  prefix="/api/products",tags=["Products"])