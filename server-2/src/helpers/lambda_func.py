import json
import logging
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from core.config import Config

logger = logging.getLogger(__name__)


class LambdaHelper:
    def __init__(self):
        self.client = boto3.client(
            "lambda",
            region_name=Config.AWS_REGION,
        )

    def trigger_summary(self, document_id: str):
        logger.info(
            f"Triggering AI summary Lambda. document_id={document_id}",
        )

        try:
            response = self.client.invoke(
                FunctionName=Config.AI_SUMMARY_LAMBDA,
                InvocationType="Event",  # Async
                Payload=json.dumps(
                    {
                        "document_id": document_id,
                    }
                ).encode("utf-8"),
            )

            status_code = response.get("StatusCode")

            if status_code not in (202,):
                logger.error(
                    "Unexpected Lambda response. status_code=%s response=%s",
                    status_code,
                    response,
                )
                raise Exception("Failed to invoke AI summary Lambda.")

            logger.info(
                "AI summary Lambda invoked successfully. document_id=%s",
                document_id,
            )

            return response

        except (ClientError, BotoCoreError):
            logger.exception(
                "AWS Lambda invocation failed. document_id=%s",
                document_id,
            )
            raise

        except Exception:
            logger.exception(
                "Unexpected error while invoking AI summary Lambda. document_id=%s",
                document_id,
            )
            raise


lambda_helper = LambdaHelper()
