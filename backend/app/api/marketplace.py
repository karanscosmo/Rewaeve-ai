from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import models

router = APIRouter(prefix='/marketplace', tags=['marketplace'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/listings')
def list_listings(db: Session = Depends(get_db)):
    listings = db.query(models.MarketplaceListing).filter(models.MarketplaceListing.status == 'active').order_by(models.MarketplaceListing.created_at.desc()).limit(20).all()
    return [
        {
            'id': listing.id,
            'title': listing.title,
            'description': listing.description,
            'category': listing.category,
            'quantity': listing.quantity,
            'price_estimate': listing.price_estimate,
        }
        for listing in listings
    ]
