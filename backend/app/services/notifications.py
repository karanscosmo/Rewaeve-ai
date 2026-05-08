from sqlalchemy.orm import Session
from app.db import models


def create_notification(db: Session, organization_id: int, title: str, message: str, level: str = 'info') -> models.Notification:
    notification = models.Notification(
        organization_id=organization_id,
        title=title,
        message=message,
        level=level,
    )
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


def list_notifications(db: Session, organization_id: int):
    return db.query(models.Notification).filter(models.Notification.organization_id == organization_id).order_by(models.Notification.created_at.desc()).limit(50).all()
