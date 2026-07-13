from decouple import config


class Config:
    DATABASE_URL = config("DATABASE_URL")
    AWS_ACCESS_KEY_ID = config("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = config("AWS_SECRET_ACCESS_KEY")
    AWS_REGION = config("AWS_REGION")
    AWS_BUCKET_NAME = config("AWS_BUCKET_NAME")
