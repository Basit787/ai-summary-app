import logging

from core.database import SessionLocal
from .repository import DocumentRepository
from .service import AIService

logger = logging.getLogger(__name__)


def lambda_handler(event, context):
    db = SessionLocal()

    try:
        record = event["Records"][0]

        s3_key = record["s3"]["object"]["key"]

        repository = DocumentRepository(db)
        service = AIService(repository)

        service.process_document(s3_key)

        return {
            "statusCode": 200,
        }

    finally:
        db.close()
