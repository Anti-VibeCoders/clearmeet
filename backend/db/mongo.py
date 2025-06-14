from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from sqlalchemy import Index

# Configura la URL de conexión a PostgreSQL
DATABASE_URL = "postgresql+asyncpg://user:password@localhost:5432/meetings_db"

# Base para los modelos
class Base(DeclarativeBase):
    pass

class PostgreSQLConnection:
    def __init__(self):
        self.engine = None
        self.db = None

    async def connect(self):
        try:
            # Crear el motor asíncrono
            self.engine = create_async_engine(DATABASE_URL, echo=True)
            # Crear una fábrica de sesiones asíncronas
            self.db = sessionmaker(self.engine, class_=AsyncSession, expire_on_commit=False)
            # Crear las tablas definidas en los modelos
            async with self.engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("Conexión a PostgreSQL establecida correctamente")
            return self.db
        except Exception as e:
            print(f"Error connecting to PostgreSQL: {e}")
            return None

    async def get_db(self):
        if self.db is None:
            self.db = await self.connect()
        async with self.db() as session:
            yield session

    async def dispose(self):
        if self.engine:
            await self.engine.dispose()

# Instancia global (mejor práctica: inyectar esta dependencia en FastAPI)
pg_connection = PostgreSQLConnection()

if __name__ == "__main__":
    import asyncio
    from sqlalchemy import Column, Integer, String, JSONB

    # Definir un modelo básico para pruebas
    class Meeting(Base):
        __tablename__ = "meetings"
        id = Column(Integer, primary_key=True, index=True)
        title = Column(String, nullable=False, index=True)
        type = Column(String, nullable=False)
        date = Column(String, nullable=False)
        duration = Column(String, nullable=False)
        data = Column(JSONB, nullable=False)
        __table_args__ = (Index('idx_meeting_data', data, postgresql_using='gin'),)

    async def test_connection():
        async for session in pg_connection.get_db():
            print("Conexión a la base de datos:", session)
            # Consulta de prueba para verificar la tabla
            result = await session.execute("SELECT * FROM meetings LIMIT 1")
            print("Resultado de la consulta de prueba:", result.fetchall())

    asyncio.run(test_connection())