from fastapi import APIRouter
from routers.document_upload.route import document_router
from routers.ai_summary.route import summary_router


router_api = APIRouter()

router_api.include_router(document_router)
router_api.include_router(summary_router)


@router_api.get("/")
def main():
    return {"message": "Hello from server"}


@router_api.get("/health")
def health():
    return {"message": "Server is running healthy"}
