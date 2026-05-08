from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.services.notifications import list_notifications

router = APIRouter(prefix='/notifications', tags=['notifications'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/')
def get_notifications(organization_id: int = 1, db: Session = Depends(get_db)):
    return list_notifications(db, organization_id)
