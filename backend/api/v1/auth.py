from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from db.db import get_db
from models import User
from schemas.user import UserRegister, UserLogin, Token
from pydantic import EmailStr

router = APIRouter()

@router.post("/register")
async def register(
    user: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    existing_user = await get_user(user.email, db)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        name=user.name,
        email=user.email,
        hashed_password=get_password_hash(user.password)
    )
    db.add(new_user)
    await db.commit()
    return {"msg": "User registered successfully"}

@router.post("/login", response_model=Token)
async def login(
    user: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    db_user = await get_user(user.email, db)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/user/{email}")
async def read_user(
    email: EmailStr,
    db: AsyncSession = Depends(get_db)
):
    user = await get_user(email, db)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
