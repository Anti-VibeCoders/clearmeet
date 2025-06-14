from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

class MongoDBConnection:
    def __init__(self):
        self.db = None
        self.loop = asyncio.get_event_loop()

    async def connect(self):
        try:
            client = AsyncIOMotorClient("mongodb://localhost:27017/")
            self.db = client["MongoDB_IA"]
            await self.db.usuarios.create_index([("email", 1)], unique=True)
            await self.db.tasks.create_index([("title", 1)])
            await self.db.archive_text.create_index([("title", 1)])
            print("Conexión a MongoDB establecida correctamente")
            return self.db
        except Exception as e:
            print("Error connecting to MongoDB: ", e)
            return None

    async def get_db(self):
        if self.db is None:
            self.db = await self.connect()
        return self.db

# Instancia global de la conexión
mongo_connection = MongoDBConnection()

# Colecciones globales (se inicializan después de conectar)
User_Collection = None
Meet_Collection = None
Archive_Collection = None

async def init_db():
    global User_Collection, Meet_Collection, Archive_Collection
    db = await mongo_connection.get_db()
    if db is not None:
        User_Collection = db.usuarios
        Meet_Collection = db.tasks
        Archive_Collection = db.archive_text

# Ejecutar la inicialización en un entorno asíncrono
if __name__ == "__main__":
    asyncio.run(init_db())