import uuid
from uuid import UUID

from fastapi import HTTPException, UploadFile

from helpers.s3 import s3_helper
from .repository import DocumentRepository


class DocumentService:
    def __init__(self, repository: DocumentRepository):
        self.repository = repository

    def upload_document(self, file: UploadFile):
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="File is required.",
            )

        if file.content_type != "text/plain" or not file.filename.lower().endswith(
            ".txt"
        ):
            raise HTTPException(
                status_code=400,
                detail="Only .txt files are allowed.",
            )

        unique_filename = f"{uuid.uuid4()}-{file.filename}"

        s3_url = s3_helper.upload_file(
            file=file.file,
            filename=unique_filename,
        )

        document = self.repository.create_document(
            filename=file.filename,
            s3_key=unique_filename,
            s3_url=s3_url,
        )

        return {
            "message": "Document uploaded successfully.",
            "document": document,
        }

    def get_documents(self):
        return self.repository.get_documents()

    def get_document(self, document_id: UUID):
        return self.repository.get_document(document_id)

    def delete_document(self, document_id: UUID):
        document = self.repository.get_document(document_id)

        s3_helper.delete_file(document.s3_key)

        self.repository.delete_document(document_id)

        return {"message": "Document deleted successfully."}

    def update_status(
        self,
        document_id: UUID,
        status: str,
    ):
        return self.repository.update_status(
            document_id,
            status,
        )

    def update_summary(
        self,
        document_id: UUID,
        summary: str,
    ):
        return self.repository.update_summary(
            document_id,
            summary,
        )
