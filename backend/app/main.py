from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
import os
from dotenv import load_dotenv

from app.auth import auth_router, get_current_user
from app.programs import programs_router
from app.content import content_router
from app.ai import ai_router
from app.progress import progress_router
from app.database import connect_to_mongo, close_mongo_connection
from app.redis_client import connect_to_redis, close_redis_connection

load_dotenv()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Initialize FastAPI app
app = FastAPI(
    title="DSCPL Hindu Spiritual Assistant API",
    description="Backend API for spiritual guidance and practice tracking",
    version="1.0.0"
)

# Add rate limiting middleware
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# CORS middleware
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5176,http://localhost:5175,http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection events
@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()
    await connect_to_redis()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()
    await close_redis_connection()

# Include routers (without api/v1 prefix to match frontend expectations)
app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(programs_router, prefix="/programs", tags=["Programs"])
app.include_router(content_router, prefix="/content", tags=["Content"])
app.include_router(ai_router, prefix="/ai", tags=["AI Content"])
app.include_router(progress_router, prefix="/progress", tags=["Progress"])

# Health check endpoint
@app.get("/health")
@limiter.limit("5/minute")
async def health_check(request):
    return {"status": "healthy", "message": "DSCPL API is running"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to DSCPL Hindu Spiritual Assistant API",
        "docs": "/docs",
        "version": "1.0.0"
    }
