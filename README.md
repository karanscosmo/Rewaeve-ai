# ReWeave AI - Industrial Circular Intelligence Platform

**Team No:** 1  
**Team Name:** 404 Waste Not Found  
**Team Members:** Karan A Sharma, Prrajwal Kataokkar

ReWeave AI is a production-grade, AI-powered industrial circular intelligence platform transforming industrial waste into intelligent economic assets. It provides real-world sustainability operations with waste analytics, recovery feasibility, AI material intelligence, marketplace matching, ESG reporting, and live industrial workflows.

## 🚀 Live Deployment (Vercel)

The platform is configured for **Vercel Services**, deploying both the Next.js frontend and FastAPI backend as high-performance serverless services.

- **Frontend:** Next.js (App Router)
- **Backend:** FastAPI (routed via `/_/backend`)
- **Database:** Vercel Postgres (Managed)

## Architecture

**Frontend:**
- Next.js 15 + React 19
- TailwindCSS with custom design system
- Framer Motion animations
- React Three Fiber + Three.js for 3D visualization
- WebSocket real-time updates (development/persistent environments)

**Backend:**
- FastAPI (Python 3.12)
- PostgreSQL + SQLAlchemy ORM
- Redis for caching (Optional in Serverless)
- Celery for async task processing (Optional in Serverless)
- WebSocket server for real-time notifications

**AI/ML Stack (Optimized):**
- **Core Engine:** Heuristic-driven AI Recovery Decision Center (Optimized for Serverless bundle size)
- **Intelligence:** OpenAI GPT-4 integration ready
- **Future-Ready:** Scikit-learn, XGBoost, and ChromaDB integration paths available for specialized heavy-compute clusters.

**Infrastructure:**
- **Local:** Docker + Docker Compose (Multi-service orchestration)
- **Production:** Vercel Services (Experimental)

## Features

✅ **Industrial Waste Upload & Processing**
- CSV, XLSX, PDF file support
- Automatic contamination analysis
- Material classification

✅ **AI Recovery Intelligence**
- Feasibility scoring (12 metrics)
- Profitability analysis
- Cost reduction estimation

✅ **Digital Water Twin**
- 3D visualization of waste characteristics
- Telemetry overlay
- Simulation pathways

✅ **ESG & Compliance**
- Sustainability reporting
- Carbon reduction analytics
- SDG alignment tracking

## Quick Start

### Prerequisites
- Node.js 20+ 
- Python 3.12+

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repo-url>
   cd reweave-ai
   cp .env.example .env
   ```

2. **Configure environment:**
   ```env
   DATABASE_URL=postgresql://...
   SECRET_KEY=your-secret-key-here
   NEXT_PUBLIC_API_URL=/_/backend
   OPENAI_API_KEY=sk-...
   ```

3. **Start services (Local Docker):**
   ```bash
   docker compose up --build
   ```

## Deployment on Vercel

This project uses the `vercel.json` multi-service configuration.

1. **Link Repository** to Vercel.
2. **Configure Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: Set to `/_/backend`
   - `DATABASE_URL`: Use Vercel Postgres connection string.
   - `SECRET_KEY`, `OPENAI_API_KEY`, `AI_PROVIDER`.
3. **Deploy**: Vercel will automatically route `/*` to the frontend and `/_/backend` to the FastAPI backend.

## Project Structure

```
reweave-ai/
├── backend/
│   ├── app/
│   │   ├── api/              # Route handlers
│   │   ├── services/         # AI Logic & File Processing
│   │   └── main.py           # FastAPI entry point
│   ├── main.py               # Vercel Bridge
│   └── requirements.txt      # Optimized for Serverless
├── frontend/
│   ├── app/                  # Next.js app directory
│   ├── lib/                  # Circular Intelligence Context
│   └── next.config.mjs
├── vercel.json               # Multi-service routing
└── DEPLOYMENT_VERCEL.md      # Detailed deployment guide
```

## Security
- JWT authentication
- Password hashing with bcrypt
- SQL injection prevention (SQLAlchemy ORM)
- Role-based access control (RBAC)

## License
Proprietary - ReWeave AI
