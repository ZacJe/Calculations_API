from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db import init_db
from app.routers import calculations

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialisation de la base de données
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(calculations.router)
