# Configuración
from pymongo import MongoClient
from pymongo.errors import ConnectionError 

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
def connect():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["MongoDB_IA"]
        db.usuarios.create_index([("email", 1)], unique=True)
        db.tasks.create_index([("title", 1)])
        db.archive_text.create_index([("title", 1)])
        return db
    except ConnectionError as e:
        print("Error connecting to MongoD: ", e)
    except :
        print("Error connecting to MongoDB:")
    finally:
        print("Connetion finished")

db = connect()

User_Collection = db.User if db is not None else None
Task_Collection = db.Task if db is not None else None
Archive_Text_Collection = db.Archive_Text if db is not None else None


