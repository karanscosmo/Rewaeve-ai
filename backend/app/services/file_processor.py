import csv
from io import BytesIO
from typing import Any
import pandas as pd
import pdfplumber

from app.services.ai_engine import (
    build_digital_twin,
    generate_recovery_feasibility,
    generate_material_intelligence,
    generate_product_opportunities,
    match_buyers_and_recyclers,
)


def parse_tabular_file(content: bytes, filename: str) -> pd.DataFrame:
    if filename.lower().endswith('.csv'):
        return pd.read_csv(BytesIO(content))
    if filename.lower().endswith(('.xlsx', '.xls')):
        return pd.read_excel(BytesIO(content))
    raise ValueError('Unsupported tabular file type')


def parse_pdf_file(content: bytes) -> list[dict[str, Any]]:
    with pdfplumber.open(BytesIO(content)) as pdf:
        data = []
        for page in pdf.pages:
            data.append({'text': page.extract_text()})
        return data


def extract_fields_from_dataframe(df: pd.DataFrame) -> dict[str, Any]:
    normalized = {}
    for col in df.columns:
        key = str(col).strip().lower().replace(' ', '_')
        normalized[key] = df[col].dropna().tolist()
    return normalized


def analyze_tabular_data(df: pd.DataFrame) -> dict[str, Any]:
    key_metrics = {}
    columns = [c.lower() for c in df.columns]

    metric_names = {
        'ph': 'pH',
        'cod': 'COD',
        'bod': 'BOD',
        'tds': 'TDS',
        'turbidity': 'Turbidity',
        'conductivity': 'Conductivity',
        'dye': 'Dye Concentration',
        'sludge': 'Sludge Percentage',
        'temperature': 'Temperature',
    }

    for raw, label in metric_names.items():
        for col in df.columns:
            if raw in col.lower():
                values = pd.to_numeric(df[col], errors='coerce').dropna()
                if not values.empty:
                    key_metrics[label] = {
                        'average': float(values.mean()),
                        'max': float(values.max()),
                        'min': float(values.min()),
                        'count': int(values.count()),
                    }
                break

    if 'waste_type' in columns or 'material_category' in columns:
        categories = df.get('material_category') or df.get('waste_type')
        key_metrics['material_categories'] = categories.dropna().astype(str).unique().tolist()
    return key_metrics


def process_upload_file(content: bytes, filename: str, user_context: dict[str, Any]) -> dict[str, Any]:
    if filename.lower().endswith(('.csv', '.xlsx', '.xls')):
        df = parse_tabular_file(content, filename)
        analytics = analyze_tabular_data(df)
        normalized = extract_fields_from_dataframe(df)
    else:
        analytics = {'document': 'pdf or image file received', 'details': []}
        normalized = {'document_text': parse_pdf_file(content)}

    twin = build_digital_twin(normalized, analytics)
    feasibility = generate_recovery_feasibility(normalized, analytics, user_context)
    intelligence = generate_material_intelligence(normalized, analytics)
    products = generate_product_opportunities(normalized, analytics)
    partners = match_buyers_and_recyclers(normalized, analytics)

    return {
        'summary': 'Industrial waste data ingested and analyzed for recovery intelligence.',
        'scores': feasibility,
        'digital_twin': twin,
        'material_intelligence': intelligence,
        'ai_recommendations': {
            'product_opportunities': products,
            'buyer_recycler_matches': partners,
        },
    }
