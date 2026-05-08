import os
import random
from typing import Any
from pydantic import BaseModel

from app.core.config import settings


class RecoveryScoreModel(BaseModel):
    recovery_feasibility: float
    profitability: float
    operational_complexity: float
    workforce_requirement: float
    machinery_compatibility: float
    treatment_dependency: float
    logistics_complexity: float
    scalability: float
    recovery_risk: float
    sustainability_impact: float
    resale_potential: float
    circularity: float


def _normalize_range(value: float, minimum=0.0, maximum=1.0) -> float:
    return max(min((value - minimum) / max((maximum - minimum), 1e-6), 1.0), 0.0)


def build_digital_twin(normalized: dict[str, Any], analytics: dict[str, Any]) -> dict[str, Any]:
    twin = {
        'environment': {
            'water_quality': analytics.get('pH', {}),
            'contamination_map': {
                'heavy_metals': bool('metal' in str(normalized).lower()),
                'organics': bool('cod' in str(normalized).lower() or 'bod' in str(normalized).lower()),
                'dye_residue': bool('dye' in str(normalized).lower()),
            },
            'recovery_paths': [
                {'path': 'Recovery Circuits', 'confidence': 0.8},
                {'path': 'Reuse Loop', 'confidence': 0.72},
            ],
        },
        'telemetry': {
            'samples': analytics,
            'material_clusters': normalized.get('material_categories', []),
        },
        'simulation': {
            'reuse_potential': random.uniform(0.45, 0.95),
            'stress_index': random.uniform(0.1, 0.55),
        },
    }
    return twin


def generate_recovery_feasibility(normalized: dict[str, Any], analytics: dict[str, Any], context: dict[str, Any]) -> dict[str, float]:
    pH = analytics.get('pH', {}).get('average', 7)
    cod = analytics.get('COD', {}).get('average', 150)
    sludge = analytics.get('Sludge Percentage', {}).get('average', 12)
    dye = analytics.get('Dye Concentration', {}).get('average', 22)

    feasibility = _normalize_range(8 - abs(7 - pH), 0, 8)
    profitability = _normalize_range((500 - cod) / 500 + (1 - sludge / 100) + (1 - dye / 100), 0, 3)
    complexity = _normalize_range((cod / 500) + (sludge / 80) + (dye / 80), 0, 3)
    workforce = _normalize_range(complexity * 0.9, 0, 1)
    compatibility = _normalize_range(1 - complexity * 0.4, 0, 1)
    treatment = _normalize_range((cod / 600) + (sludge / 120), 0, 2)
    logistics = _normalize_range(0.5 + len(normalized.get('material_categories', [])) * 0.1, 0, 1)
    scalability = _normalize_range(0.4 + feasibility * 0.4, 0, 1)
    risk = _normalize_range(1 - feasibility + complexity * 0.5, 0, 1)
    impact = _normalize_range(feasibility * 0.95 + 0.05, 0, 1)
    resale = _normalize_range(0.5 + feasibility * 0.35, 0, 1)
    circularity = _normalize_range(feasibility * 0.9 + resale * 0.1, 0, 1)

    return RecoveryScoreModel(
        recovery_feasibility=round(feasibility, 2),
        profitability=round(profitability, 2),
        operational_complexity=round(complexity, 2),
        workforce_requirement=round(workforce, 2),
        machinery_compatibility=round(compatibility, 2),
        treatment_dependency=round(treatment, 2),
        logistics_complexity=round(logistics, 2),
        scalability=round(scalability, 2),
        recovery_risk=round(risk, 2),
        sustainability_impact=round(impact, 2),
        resale_potential=round(resale, 2),
        circularity=round(circularity, 2),
    ).model_dump()


def generate_material_intelligence(normalized: dict[str, Any], analytics: dict[str, Any]) -> dict[str, Any]:
    categories = normalized.get('material_categories', [])
    if not categories:
        categories = ['industrial_emulsion', 'mixed_sludge']

    return {
        'primary_materials': categories,
        'recyclability_score': round(random.uniform(0.54, 0.93), 2),
        'contamination_risk': round(random.uniform(0.24, 0.88), 2),
        'segregation_difficulty': round(random.uniform(0.2, 0.8), 2),
        'recommended_workflow': 'Layered segregation with advanced filtration and polymer recovery',
        'reuse_estimate': 'up to 38% of bulk stream recoverable for secondary manufacturing',
    }


def generate_product_opportunities(normalized: dict[str, Any], analytics: dict[str, Any]) -> list[dict[str, Any]]:
    categories = normalized.get('material_categories', [])
    opportunities = []
    if any('textile' in c.lower() for c in categories):
        opportunities.append({
            'name': 'Eco insulation boards',
            'feasibility': 0.86,
            'profitability': 0.76,
            'production_complexity': 0.48,
            'machinery_compatibility': 0.7,
            'workforce_requirement': 0.42,
            'carbon_reduction': 0.33,
            'nearby_buyers': ['Green Building Supplies', 'Circular Construction Co.'],
        })
    if any('sludge' in c.lower() for c in categories) or 'mixed_sludge' in categories:
        opportunities.append({
            'name': 'Eco bricks & composite filler',
            'feasibility': 0.79,
            'profitability': 0.68,
            'production_complexity': 0.6,
            'machinery_compatibility': 0.65,
            'workforce_requirement': 0.55,
            'carbon_reduction': 0.4,
            'nearby_buyers': ['Industrial Concrete Partners', 'Waste2Brick Network'],
        })
    if any('dye' in c.lower() for c in categories) or 'dye' in str(normalized).lower():
        opportunities.append({
            'name': 'Industrial pigment recoveries',
            'feasibility': 0.82,
            'profitability': 0.71,
            'production_complexity': 0.51,
            'machinery_compatibility': 0.78,
            'workforce_requirement': 0.35,
            'carbon_reduction': 0.26,
            'nearby_buyers': ['Eco Color Supply', 'Biodegradable Textile Partners'],
        })
    if not opportunities:
        opportunities.append({
            'name': 'Mixed material composite pellets',
            'feasibility': 0.63,
            'profitability': 0.58,
            'production_complexity': 0.72,
            'machinery_compatibility': 0.54,
            'workforce_requirement': 0.6,
            'carbon_reduction': 0.29,
            'nearby_buyers': ['Circular Manufacturing Hub'],
        })
    return opportunities


def match_buyers_and_recyclers(normalized: dict[str, Any], analytics: dict[str, Any]) -> list[dict[str, Any]]:
    return [
        {'partner': 'Harvest Recyclers', 'confidence': 0.91, 'scope': 'high-volume industrial sludge', 'pricing_index': 0.82},
        {'partner': 'AquaRenew Logistics', 'confidence': 0.78, 'scope': 'membrane recovery & buyer matching', 'pricing_index': 0.75},
    ]
