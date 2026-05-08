from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.db import models
from pydantic import BaseModel


router = APIRouter(prefix='/workspace', tags=['workspace'])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get('/dashboard')
def get_dashboard(user_id: int = 1, db: Session = Depends(get_db)):
    uploads = db.query(models.Upload).order_by(models.Upload.created_at.desc()).limit(6).all()
    reports = db.query(models.RecoveryReport).order_by(models.RecoveryReport.created_at.desc()).limit(4).all()
    listings = db.query(models.MarketplaceListing).order_by(models.MarketplaceListing.created_at.desc()).limit(5).all()
    return {
        'recent_uploads': [
            {'id': u.id, 'filename': u.filename, 'status': u.status, 'created_at': u.created_at.isoformat()}
            for u in uploads
        ],
        'recent_reports': [
            {'id': r.id, 'summary': r.summary, 'scores': r.scores} for r in reports
        ],
        'marketplace': [
            {'id': m.id, 'title': m.title, 'category': m.category, 'price_estimate': m.price_estimate}
            for m in listings
        ],
    }


class ConceptRequest(BaseModel):
    material_type: str = 'Mixed Synthetic Textiles'
    volume_tons: float = 50.0


@router.post('/generate-concepts')
def generate_concepts(payload: ConceptRequest):
    """AI-powered product concept generation from waste material parameters."""
    concepts = []

    if 'textile' in payload.material_type.lower() or 'fabric' in payload.material_type.lower():
        concepts.append({
            'id': 1,
            'title': 'Aero-Acoustic Hex Panels',
            'tags': ['Fabric Waste', 'Acoustic Panels'],
            'description': 'High-density sound absorption panels from mixed synthetic textile offcuts.',
            'feasibility_score': 8.7,
            'carbon_offset_kg': -4.2,
            'match_pct': 94,
        })
    if 'polymer' in payload.material_type.lower() or 'plastic' in payload.material_type.lower():
        concepts.append({
            'id': 2,
            'title': 'Poly-Core Lumber',
            'tags': ['HDPE Plastics', 'Structural Beams'],
            'description': 'Extruded structural profiles utilizing unsorted grade 2 plastics.',
            'feasibility_score': 6.5,
            'carbon_offset_kg': -12.0,
            'match_pct': 76,
        })
    if 'agri' in payload.material_type.lower() or 'bio' in payload.material_type.lower():
        concepts.append({
            'id': 3,
            'title': 'Myco-Foam Inserts',
            'tags': ['Agri-Waste', 'Protective Packaging'],
            'description': 'Mycelium-bound agricultural husk composite replacing EPS foam.',
            'feasibility_score': 9.2,
            'carbon_offset_kg': -1.8,
            'match_pct': 88,
        })

    if not concepts:
        concepts.append({
            'id': 4,
            'title': 'Mixed Material Composite Pellets',
            'tags': ['Mixed Waste', 'Composite'],
            'description': 'Generic composite pellets from mixed industrial waste streams.',
            'feasibility_score': 6.3,
            'carbon_offset_kg': -2.9,
            'match_pct': 65,
        })

    return {
        'material_type': payload.material_type,
        'volume_tons': payload.volume_tons,
        'concepts': concepts,
        'market_demand': [
            {'label': 'Acoustic Insulation', 'demand_pct': 85, 'growth': '+12%'},
            {'label': 'Biodegradable Packaging', 'demand_pct': 92, 'growth': '+18%'},
            {'label': 'Composite Lumber', 'demand_pct': 60, 'growth': '-2%'},
        ],
    }


@router.get('/water-twin')
def get_water_twin():
    """Returns digital water twin telemetry data."""
    return {
        'flow_rate_ml_d': 42.8,
        'contaminant_load_mg_l': 1.2,
        'reuse_prediction_pct': 85,
        'confidence_score': 'High',
        'recovery_estimate_ml_d': 12.4,
        'economics': {
            'projected_roi_pct': 24.5,
            'roi_change': '+2.1% this quarter',
            'energy_savings_usd': 1200000,
            'carbon_offset_tons': 450,
        },
        'syncing': True,
    }
