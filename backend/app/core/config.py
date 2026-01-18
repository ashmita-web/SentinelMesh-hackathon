from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SentinelMesh Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    DEBUG: bool = True

    DATABASE_URL: str

    class Config:
        env_file = ".env"

settings = Settings()
