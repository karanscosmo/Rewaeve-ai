from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship

from app.db.base import Base


class Organization(Base):
    __tablename__ = 'organizations'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), unique=True, index=True, nullable=False)
    industry = Column(String(128), nullable=True)
    subscription_plan = Column(String(64), default='Starter')
    created_at = Column(DateTime, default=datetime.utcnow)
    users = relationship('User', back_populates='organization')


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(256), unique=True, index=True, nullable=False)
    full_name = Column(String(128), nullable=False)
    hashed_password = Column(String(256), nullable=False)
    role = Column(String(64), nullable=False, default='Manufacturer')
    is_active = Column(Boolean, default=True)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    organization = relationship('Organization', back_populates='users')
    created_at = Column(DateTime, default=datetime.utcnow)


class Upload(Base):
    __tablename__ = 'uploads'

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    filename = Column(String(256), nullable=False)
    file_type = Column(String(64), nullable=False)
    meta_info = Column(JSON, default={})
    status = Column(String(64), default='processing')
    created_at = Column(DateTime, default=datetime.utcnow)
    report = relationship('RecoveryReport', back_populates='upload', uselist=False)


class RecoveryReport(Base):
    __tablename__ = 'recovery_reports'

    id = Column(Integer, primary_key=True, index=True)
    upload_id = Column(Integer, ForeignKey('uploads.id'))
    summary = Column(Text)
    digital_twin = Column(JSON, default={})
    scores = Column(JSON, default={})
    diagnostics = Column(JSON, default={})
    material_intelligence = Column(JSON, default={})
    ai_recommendations = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)
    upload = relationship('Upload', back_populates='report')


class MarketplaceListing(Base):
    __tablename__ = 'marketplace_listings'

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    title = Column(String(220), nullable=False)
    description = Column(Text)
    category = Column(String(128), nullable=False)
    quantity = Column(String(64), nullable=False)
    price_estimate = Column(Float, nullable=False)
    status = Column(String(64), default='active')
    meta_info = Column(JSON, default={})
    created_at = Column(DateTime, default=datetime.utcnow)


class Notification(Base):
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey('organizations.id'))
    title = Column(String(220), nullable=False)
    message = Column(Text)
    level = Column(String(48), default='info')
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
