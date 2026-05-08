from celery import Celery
from app.core.config import settings
from app.services.file_processor import process_upload_file
from app.db.session import SessionLocal
from app.db import models
from app.services.notifications import create_notification

celery = Celery(
    'reweave',
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)
celery.conf.task_routes = {'app.tasks.process_file_upload': {'queue': 'uploads'}}


@celery.task(name='app.tasks.process_file_upload')
def process_file_upload(upload_id: int, content: bytes, filename: str, organization_id: int):
    db = SessionLocal()
    try:
        upload = db.query(models.Upload).get(upload_id)
        if not upload:
            return {'error': 'upload not found'}
        result = process_upload_file(content, filename, {'organization_id': organization_id})
        report = models.RecoveryReport(
            upload_id=upload.id,
            summary=result['summary'],
            digital_twin=result['digital_twin'],
            scores=result['scores'],
            material_intelligence=result['material_intelligence'],
            ai_recommendations=result['ai_recommendations'],
        )
        upload.status = 'completed'
        db.add(report)
        db.commit()
        create_notification(
            db,
            organization_id=organization_id,
            title='AI recovery processing complete',
            message=f'Upload {upload.filename} completed with recovery insights.',
            level='success',
        )
        return {'upload_id': upload.id, 'report_id': report.id}
    finally:
        db.close()
