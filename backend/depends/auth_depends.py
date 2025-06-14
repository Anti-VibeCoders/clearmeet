from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import EmailStr
from user import UserRegister, UserLogin, Token, UserInDB
from models import User
from database import pg_connection
from depends.auth_depends import get_user, get_password_hash, verify_password, create_access_token
from datetime import timedelta

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

@router.post("/register", response_model=UserInDB)
async def register(user: UserRegister, db: AsyncSession = Depends(pg_connection.get_db)):
    existing_user = await get_user(user.email, db)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(name=user.name, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    try:
        await db.commit()
        await db.refresh(db_user)
        return db_user
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=400, detail=f"Error registering user: {str(e)}")

@router.post("/login", response_model=Token)
async def login(user: UserLogin, db: AsyncSession = Depends(pg_connection.get_db)):
    db_user = await get_user(user.email, db)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect credentials")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/user/{email}", response_model=UserInDB)
async def read_user(email: EmailStr, db: AsyncSession = Depends(pg_connection.get_db)):
    user = await get_user(email, db)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user