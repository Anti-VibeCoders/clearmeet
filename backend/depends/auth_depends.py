from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from jose import jwt
from pydantic import EmailStr
from typing import Optional
from models.user import UserRegister
from db.mongo import mongo_connection  

# Configuración de seguridad
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Funciones de contraseña
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# Obtener usuario desde MongoDB
async def get_user(email: EmailStr) -> Optional[UserRegister]:
    user = await (await mongo_connection.user_collection).find_one({"email": email})
    return UserRegister(**user) if user else None

# Generar JWT
def create_access_token(data: dict, expires_delta: timedelta = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)