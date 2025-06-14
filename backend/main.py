from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from database import pg_connection, Base, engine
from auth import router as auth_router
from meetings import router as meetings_router

app = FastAPI(
    title="ClearMeet",
    version="0.1.0",
    debug=True,
    description="ClearMeet API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    try:
        # Crear las tablas definidas en models.py
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        print("PostgreSQL inicializado en el startup")
    except Exception as e:
        print(f"Error al conectar a PostgreSQL: {e}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    try:
        await pg_connection.dispose()
        print("Conexión a PostgreSQL cerrada")
    except Exception as e:
        print(f"Error al cerrar conexión: {e}")

# Incluir los routers
app.include_router(auth_router, prefix="/api")
app.include_router(meetings_router, prefix="/api/meet")