from fastapi import APIRouter, HTTPException
from fastapi.security import OAuth2PasswordBearer
from typing import List
from models.user  import UserRegister, UserLogin, Token
from depends.auth_depends import get_user, get_password_hash
from db.mongo import MongoDBConnection

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/register") 
async def register(user: UserRegister):
    existing_user = await get_user(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    user_dict = {
        "name": user.name,
        "mail": user.email,
        "hashed_password": hashed_password
    }
    await MongoDBConnection.user_collection.insert_one(user_dict)
    return {"msg": "Successfully registered user"}

@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db_user = await get_user(user.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}