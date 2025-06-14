from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(BaseModel):
    email: EmailStr
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
