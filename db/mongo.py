from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

def connect():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["MongoDB_IA"]
        return db
    except:
        print("Error connecting to MongoDB")
    finally:
        Print("Conexion exitosa")
        client.close()

def insertUser(self, name, email, password, phone = None):
    db = self.db
    collection = db["User"]
    try:
        collection.insertUser(
        {
            "name": name,
            "email": email,
            "password": password,
            "phone": phone,
            "Date": datetime.now()
        }
    )
    except: print("Error inserting user")
    db.save()
    return True

def insertTask(self, id_user, description):
    db = self.db
    collection = db["User"]
    try:
        collection.insertUser(
        {
            "id_user": id_user,
            "description": description,
            "Date": datetime.now()
        }
    )
    except: print("Error inserting user")
    db.save()
    return True

def __init__(self):
    self.db = connect()

