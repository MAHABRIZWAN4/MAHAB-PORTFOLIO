from datetime import datetime, timezone
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.config import settings

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create FastAPI application
app = FastAPI(
    title="Mahab Rizwan Portfolio API",
    description="AI-powered portfolio backend built with FastAPI, OpenRouter, and Supabase",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add rate limiting middleware
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)


@app.get("/")
async def root():
    """Root endpoint - API information."""
    return {
        "message": "Mahab Rizwan Portfolio API",
        "version": "1.0.0",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "api": "Mahab Portfolio Backend",
    }


@app.get("/ping")
async def ping():
    """Ping endpoint for uptime monitoring (UptimeRobot)."""
    return {
        "status": "alive",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# Include routers
from app.routes.agent import router as agent_router
from app.routes.contact import router as contact_router

app.include_router(agent_router, prefix="/agent", tags=["AI Agent"])
app.include_router(contact_router, prefix="/contact", tags=["Contact"])
