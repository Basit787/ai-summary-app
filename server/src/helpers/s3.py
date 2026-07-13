import boto3
from botocore.exceptions import ClientError
from fastapi import HTTPException
from core.config import Config


class S3Helper:
    def __init__(self):
        self.client = boto3.client(
            "s3",
            region_name=Config.AWS_REGION,
            aws_access_key_id=Config.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=Config.AWS_SECRET_ACCESS_KEY,
        )

    def upload_file(self, file, filename: str) -> str:
        try:
            self.client.upload_fileobj(
                Fileobj=file,
                Bucket=Config.AWS_BUCKET_NAME,
                Key=filename,
                ExtraArgs={
                    "ContentType": "text/plain",
                },
            )
            return f"https://{Config.AWS_BUCKET_NAME}.s3.{Config.AWS_REGION}.amazonaws.com/{filename}"
        except ClientError as e:
            raise HTTPException(
                status_code=500,
                detail=f"S3 Upload Error: {str(e)}",
            )

    def delete_file(self, filename: str):
        try:
            self.client.delete_object(
                Bucket=Config.AWS_BUCKET_NAME,
                Key=filename,
            )
        except ClientError as e:
            raise HTTPException(
                status_code=500,
                detail=f"S3 Delete Error: {str(e)}",
            )

    def file_exists(self, filename: str) -> bool:
        try:
            self.client.head_object(
                Bucket=Config.AWS_BUCKET_NAME,
                Key=filename,
            )
            return True
        except ClientError:
            return False


s3_helper = S3Helper()
