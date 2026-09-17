from fastapi import FastAPI
from sqlalchemy import text
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine , get_db
from app.db.init_db import init_db
from app.api.v1.routes.auth import router as auth_router
from app.api.v1.routes.analysis import router as analysis_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verify DB connectivity at startup, then create tables.
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))
        print("✅ Database connected successfully")
    except Exception as e:
        print("❌ Database connection failed")
        print(e)
    await init_db()
    yield


app = FastAPI(
    lifespan=lifespan
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    auth_router,
    prefix="/api/v1"
)

app.include_router(
    analysis_router,
    prefix="/api/v1"
)


@app.get("/")
async def root():
    return {
        "message": "DataLens AI Backend Running"
    }