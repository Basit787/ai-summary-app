from core.database import Base
from core.database import engine
from routers.document_upload.model import Document  # noqa: F401


def create_tables():
    Base.metadata.create_all(bind=engine)
