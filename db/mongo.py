# Configuración
from pymongo import MongoClient


SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def connect():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["MongoDB_IA"]
        db.usuarios.create_index([("email", 1)], unique=True)
        db.tasks.create_index([("title", 1)])
        db.archive_text.create_index([("title", 1)])
        return db
    except:
        print("Error connecting to MongoDB")
    finally:
        Print("Conexion exitosa")

db = connect()

User_Collection = db.User() if db else None
Task_Collection = db.Task() if db else None
Archive_Text_Collection = db.Archive_Text() if db else None


