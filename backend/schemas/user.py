from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "name": "María González",
                "email": "maria.gonzalez@example.com",
                "password": "securepassword123"
            }
        }

class UserLogin(BaseModel):
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "maria.gonzalez@example.com",
                "password": "securepassword123"
            }
        }

class UserInDB(BaseModel):
    id: int  # Cambiado a int para PostgreSQL
    email: EmailStr
    hashed_password: str
    name: str

    class Config:
        from_attributes = True  # Permite mapear desde objetos ORM
        json_schema_extra = {
            "example": {
                "id": 1,
                "email": "maria.gonzalez@example.com",
                "hashed_password": "$2b$12$Kix2...hashedpassword",
                "name": "María González"
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer"
            }
        }