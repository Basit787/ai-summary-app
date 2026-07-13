from fastapi import APIRouter
from .documents.route import document_router

router_api = APIRouter()

router_api.include_router(document_router)


@router_api.get("/")
def main():
    return {"message": "Hello from server"}


@router_api.get("/health")
def health():
    return {"message": "Server is running healthy"}
