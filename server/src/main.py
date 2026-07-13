from fastapi import FastAPI
from routers.router import router_api
from contextlib import asynccontextmanager
from utils.init_db import create_tables
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables()
    yield


app = FastAPI(lifespan=lifespan, title="Ai Summary App Backend")

origins = [
    "http://172.31.90.81:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_api)
