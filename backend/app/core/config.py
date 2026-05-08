from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import Field

BASE_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    APP_NAME: str = 'ReWeave AI'
    DATABASE_URL: str = Field(
        'postgresql://reweave:reweave@db:5432/reweave', validation_alias='DATABASE_URL'
    )
    SECRET_KEY: str = Field('CHANGE_ME_FASTAPI_SECRET', validation_alias='SECRET_KEY')
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    REDIS_URL: str = Field('redis://redis:6379/0', validation_alias='REDIS_URL')
    AI_PROVIDER: str = Field('openai', validation_alias='AI_PROVIDER')
    OPENAI_API_KEY: str | None = Field(None, validation_alias='OPENAI_API_KEY')
    CHROMA_PERSIST_DIR: str = Field(str(BASE_DIR / 'data' / 'chroma'), validation_alias='CHROMA_PERSIST_DIR')
    ENVIRONMENT: str = Field('development', validation_alias='ENVIRONMENT')

    class Config:
        env_file = str(BASE_DIR.parent / '.env')


settings = Settings()
