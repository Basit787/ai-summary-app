from uuid import UUID

from fastapi import HTTPException, UploadFile
from sqlalchemy.orm import Session

from .model import Document


class DocumentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_document(
        self,
        filename: str,
        s3_key: str,
        s3_url: str,
    ) -> Document:
        document = Document(
            filename=filename,
            s3_key=s3_key,
            s3_url=s3_url,
            status="UPLOADED",
        )

        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)

        return document

    def get_documents(self) -> list[Document]:
        return self.db.query(Document).order_by(Document.created_at.desc()).all()

    def get_document(self, document_id: UUID) -> Document:
        document = self.db.query(Document).filter(Document.id == document_id).first()

        if not document:
            raise HTTPException(
                status_code=404,
                detail="Document not found.",
            )

        return document

    def update_status(
        self,
        document_id: UUID,
        status: str,
    ) -> Document:
        document = self.get_document(document_id)

        document.status = status

        self.db.commit()
        self.db.refresh(document)

        return document

    def update_summary(
        self,
        document_id: UUID,
        summary: str,
    ) -> Document:
        document = self.get_document(document_id)

        document.summary = summary
        document.status = "COMPLETED"

        self.db.commit()
        self.db.refresh(document)

        return document

    def delete_document(
        self,
        document_id: UUID,
    ) -> None:
        document = self.get_document(document_id)

        self.db.delete(document)
        self.db.commit()
