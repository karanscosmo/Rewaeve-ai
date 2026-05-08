from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import models
from app.services.file_processor import process_upload_file
from app.services.notifications import create_notification

router = APIRouter(prefix='/uploads', tags=['uploads'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post('/file')
def upload_file(file: UploadFile = File(...), user_id: int = 1, db: Session = Depends(get_db)):
    content = file.file.read()
    if not content:
        raise HTTPException(status_code=400, detail='Uploaded file is empty')
    upload = models.Upload(
        organization_id=1,
        user_id=user_id,
        filename=file.filename,
        file_type=file.content_type,
        meta_info={'size': len(content)},
        status='processing',
    )
    db.add(upload)
    db.commit()
    db.refresh(upload)

    result = process_upload_file(content, file.filename, {'organization_id': 1})
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
        organization_id=upload.organization_id,
        title='Recovery analysis complete',
        message=f'Upload {upload.filename} processed and recovery intelligence created.',
        level='success',
    )
    return {'upload_id': upload.id, 'report_id': report.id, 'status': upload.status}
