from fastapi import APIRouter,HTTPException,Depends
from models.user import User
from schemas import user_schema
from tortoise.exceptions import IntegrityError
from helpers import user_helper


router=APIRouter()

@router.post("/signup")
async def create_user(user:user_schema.UserCreate):
    try:
        new_user=await User.create(
            username=user.username,
            email=user.email,
            password=user_helper.hash_password(user.password)
        )
        
        token=user_helper.create_access_token(new_user.id)
        
        return {"id": new_user.id, "username": new_user.username, "email": new_user.email,"token":token}
    
    except IntegrityError:
        raise HTTPException(status_code=400,detail="Email already Exists")    
  
            
  
@router.post("/login")
async def login_user(user:user_schema.Userlogin): 
    existing_user=await User.get_or_none(email=user.email)
    
    if not existing_user:
        raise HTTPException(status_code=400,detail="Email not FOUND")
    
    if not user_helper.verify_password(user.password,existing_user.password):
        raise HTTPException(status_code=404, detail="Invalid email or password")
    
    token=user_helper.create_access_token(existing_user.id)
    
    return {
        "message": "Login successful",
        "username": existing_user.username,
        "email": existing_user.email,
        "token":token
    }

@router.get("/{userId}")
async def get_user_by_id(userId: int):
    user=await User.get_or_none(id=userId)
    return {"username":user.username,"email":user.email}
    


    
     
@router.patch("/{userId}")
async def update_user(userId: int, user_db: user_schema.UserUpdate):
    user = await User.get_or_none(id=userId)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_db.username is not None:
        user.username = user_db.username

    if user_db.email is not None:
        user.email = user_db.email

    if user_db.password is not None:
        user.password = user_helper.hash_password(user_db.password) 

    await user.save()
    return user
     
 

@router.delete("/{userId}")
async def delete_user(userId:int):
    user=await User.get_or_none(id=userId)
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    await user.delete()
    
    return{"detail":"User Deleted Successfully"}