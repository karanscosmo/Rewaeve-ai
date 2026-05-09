# ReWeave AI - Industrial Circular Intelligence Platform

**Team No:** 1  
**Team Name:** 404 Waste Not Found  
**Team Members:** Karan A Sharma, Prrajwal Kataokkar

ReWeave AI is a production-grade, AI-powered industrial circular intelligence platform transforming industrial waste into intelligent economic assets. It provides real-world sustainability operations with waste analytics, recovery feasibility, AI material intelligence, marketplace matching, ESG reporting, and live industrial workflows.

## Architecture

**Frontend:**
- Next.js 15 + React 19
- TailwindCSS with custom design system
- Framer Motion animations
- React Three Fiber + Three.js for 3D visualization
- WebSocket real-time updates

**Backend:**
- FastAPI (Python 3.12)
- PostgreSQL + SQLAlchemy ORM
- Redis for caching
- Celery for async task processing
- WebSocket server for real-time notifications

**AI/ML Stack:**
- OpenAI GPT-4.1 integration ready
- LangChain + ChromaDB for RAG
- Scikit-learn, XGBoost for scoring models
- Pandas/NumPy for data processing

**Infrastructure:**
- Docker + Docker Compose
- Multi-service orchestration
- Development hot-reload enabled

## Features

✅ **Industrial Waste Upload & Processing**
- CSV, XLSX, PDF file support
- Automatic contamination analysis
- Material classification
- Real-time processing status

✅ **AI Recovery Intelligence**
- Feasibility scoring (12 metrics)
- Profitability analysis
- Cost reduction estimation
- ROI & payback period calculation

✅ **Digital Water Twin**
- 3D visualization of waste characteristics
- Telemetry overlay
- Simulation pathways
- Environmental heatmaps

✅ **AI Material Intelligence**
- Automatic waste classification
- Recyclability prediction
- Contamination risk assessment
- Segregation difficulty scoring

✅ **Product Innovation Engine**
- Automated recycled product suggestions
- Feasibility & profitability scoring
- Machinery compatibility analysis
- Nearby buyer identification

✅ **Industrial Marketplace**
- Waste stream listings
- Recycled material trading
- Treatment contract tenders
- Live bidding system

✅ **Buyer/Recycler Matching**
- AI-powered partnership recommendations
- Pricing intelligence
- Logistics optimization
- Recurring demand prediction

✅ **Role-Based Access**
- Manufacturer workspace
- Recycler operations
- Buyer marketplace
- Treatment provider contracts
- Sustainability team ESG tracking
- Admin management

✅ **ESG & Compliance**
- Sustainability reporting
- Carbon reduction analytics
- Water savings forecasts
- SDG alignment tracking
- PDF-ready compliance reports

✅ **Real-Time Infrastructure**
- WebSocket notifications
- Live dashboard updates
- Activity feeds
- AI alert system

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)
- Python 3.12+ (for local backend development)

### Installation

1. **Clone and setup:**
   ```bash
   cd /Users/karansharma/Desktop/reweave-ai
   cp .env.example .env
   ```

2. **Configure environment:**
   ```bash
   # .env
   DATABASE_URL=postgresql://reweave:reweave@db:5432/reweave
   SECRET_KEY=your-secret-key-here
   OPENAI_API_KEY=sk-...
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Start services:**
   ```bash
   docker compose up --build
   ```

4. **Access platform:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

## API Endpoints

### Authentication
- `POST /auth/register` - Create new user/organization
- `POST /auth/login` - Authenticate and receive token

### Uploads & Processing
- `POST /uploads/file` - Upload waste data (CSV/XLSX/PDF)
- Returns: upload_id, report_id, recovery scores

### Workspace
- `GET /workspace/dashboard` - Dashboard data (recent uploads, reports, marketplace)

### Marketplace
- `GET /marketplace/listings` - Industrial waste listings

### Notifications
- `GET /notifications/` - List recent notifications
- `WebSocket /ws/notifications` - Real-time notification stream

### System
- `GET /health` - Service health check

## Development

### Local Development (without Docker)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
yarn install
yarn dev
```

### Database Migrations
```bash
docker exec reweave-ai-backend-1 alembic upgrade head
```

### Running Tests
```bash
# Backend
python -m pytest backend/tests

# Frontend
yarn test
```

## Project Structure

```
reweave-ai/
├── backend/
│   ├── app/
│   │   ├── api/              # Route handlers
│   │   ├── core/             # Configuration
│   │   ├── db/               # Database models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic
│   │   └── main.py           # FastAPI app
│   ├── requirements.txt
│   ├── Dockerfile
│   └── tasks.py              # Celery tasks
├── frontend/
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   ├── hooks/                # Custom hooks
│   ├── lib/                  # Utilities & API client
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## Deployment

### Docker Compose (Production-Ready)

Services included:
- **backend**: FastAPI server with hot-reload
- **frontend**: Next.js development server
- **db**: PostgreSQL 16 with persistent storage
- **redis**: Redis cache/queue
- **celery**: Async task worker

### Environment Variables

```env
DATABASE_URL=postgresql://reweave:reweave@db:5432/reweave
SECRET_KEY=secure-random-key
REDIS_URL=redis://redis:6379/0
NEXT_PUBLIC_API_URL=http://localhost:8000
OPENAI_API_KEY=sk-...
ENVIRONMENT=production
```

### Scaling

- Frontend: Deploy to Vercel
- Backend: Deploy to Railway/Render/AWS
- Database: Use managed PostgreSQL
- Cache: Use managed Redis
- Tasks: Scale Celery workers independently

## Performance

- File uploads: Async processing via Celery
- Real-time updates: WebSocket connections
- Data fetch: Optimized SQL queries
- Frontend: Next.js static generation + ISR
- Caching: Redis for session/data cache

## Security

- JWT authentication
- Password hashing with bcrypt
- CORS properly configured
- SQL injection prevention (SQLAlchemy ORM)
- Environment variable management
- Role-based access control

## Support

For issues or questions, open an issue on the repository or contact the development team.

## License

Proprietary - ReWeave AI
