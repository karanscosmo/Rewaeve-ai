from pydantic import BaseModel
from typing import Any


class UploadResponse(BaseModel):
    id: int
    filename: str
    file_type: str
    status: str
    metadata: dict[str, Any] = {}

    class Config:
        orm_mode = True


class FileProcessResult(BaseModel):
    upload_id: int
    summary: str
    scores: dict[str, float]
    digital_twin: dict[str, Any]
    material_intelligence: dict[str, Any]
    ai_recommendations: dict[str, Any]
