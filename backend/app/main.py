from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from app.api import auth, uploads, workspace, notifications, marketplace
from app.services.websocket_manager import manager
from app.db.base import Base
from app.db.session import engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title='ReWeave AI', version='1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*', 'http://localhost:3000', 'http://localhost:8000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth)
app.include_router(uploads)
app.include_router(workspace)
app.include_router(notifications)
app.include_router(marketplace)

@app.get('/health')
async def health_check():
    return {'status': 'ok', 'service': 'ReWeave AI Backend'}

@app.websocket('/ws/notifications')
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast({'type': 'echo', 'message': data})
    except Exception:
        manager.disconnect(websocket)
