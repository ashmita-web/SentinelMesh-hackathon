from fastapi import FastAPI
from app.core.config import settings
from app.api.routes_health import router as health_router
from app.api.routes_ws import router as ws_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

app.include_router(health_router, prefix="/api")
app.include_router(ws_router, prefix="/api")
