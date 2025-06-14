from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

class MongoDBConnection:
    def __init__(self):
        self.db = None

    async def connect(self):
        try:
            self.client = AsyncIOMotorClient("mongodb://localhost:27017/")
            self.db = self.client["MongoDB_IA"]
            await self.db.user.create_index([("email", 1)], unique=True)
            await self.db.meet.create_index([("title", 1)])
            print("Conexión a MongoDB establecida correctamente")
            return self.db
        except Exception as e:
            print("Error connecting to MongoDB: ", e)
            return None

    async def get_db(self):
        if self.db is None:
            self.db = await self.connect()
        return self.db

    @property
    async def user_collection(self):
        db = await self.get_db()
        return db.user

    @property
    async def meet_collection(self):
        db = await self.get_db()
        return db.meet

# Instancia global (mejor práctica: inyectar esta dependencia en FastAPI)
mongo_connection = MongoDBConnection()

if __name__ == "__main__":
    async def test_connection():
        db = await mongo_connection.get_db()
        print("Colección de usuarios:", await mongo_connection.user_collection)

    asyncio.run(test_connection())
