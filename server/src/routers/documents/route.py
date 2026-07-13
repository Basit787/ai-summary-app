from uuid import UUID
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session
from core.database import get_db
from .repository import DocumentRepository
from .schema import (
    DocumentResponse,
    UploadDocumentResponse,
)
from .service import DocumentService

document_router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@document_router.post(
    "/upload",
    response_model=UploadDocumentResponse,
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    repository = DocumentRepository(db)
    service = DocumentService(repository)
    return service.upload_document(file)


@document_router.get(
    "",
    response_model=list[DocumentResponse],
)
def get_documents(
    db: Session = Depends(get_db),
):
    repository = DocumentRepository(db)
    service = DocumentService(repository)
    return service.get_documents()


@document_router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def get_document(
    document_id: UUID,
    db: Session = Depends(get_db),
):
    repository = DocumentRepository(db)
    service = DocumentService(repository)
    return service.get_document(document_id)


@document_router.delete(
    "/{document_id}",
)
def delete_document(
    document_id: UUID,
    db: Session = Depends(get_db),
):
    repository = DocumentRepository(db)
    service = DocumentService(repository)
    service.delete_document(document_id)
    return {"message": "Document deleted successfully."}
