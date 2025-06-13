from doctest import debug
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import outh
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
app.include_router(
    outh.router,
    prefix="/api",
)