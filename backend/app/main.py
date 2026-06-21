"""
System Design Visualizer — FastAPI Application Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config.settings import settings
from app.models.errors import (
    InvalidPromptError,
    LLMTimeoutError,
    InvalidLLMOutputError,
    ProviderNotConfiguredError,
    HistoryNotFoundError,
    invalid_prompt_handler,
    llm_timeout_handler,
    invalid_llm_output_handler,
    provider_not_configured_handler,
    history_not_found_handler,
)
from app.routers import design, history, scoring, export, interview

# ---- App Instance ----
app = FastAPI(
    title="System Design Visualizer API",
    description=(
        "AI-powered system design analysis and interactive architecture diagram generator. "
        "Supports OpenAI and Anthropic LLM providers."
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---- CORS ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Exception Handlers ----
app.add_exception_handler(InvalidPromptError, invalid_prompt_handler)
app.add_exception_handler(LLMTimeoutError, llm_timeout_handler)
app.add_exception_handler(InvalidLLMOutputError, invalid_llm_output_handler)
app.add_exception_handler(ProviderNotConfiguredError, provider_not_configured_handler)
app.add_exception_handler(HistoryNotFoundError, history_not_found_handler)

# ---- Routers ----
app.include_router(design.router)
app.include_router(history.router)
app.include_router(scoring.router)
app.include_router(export.router)
app.include_router(interview.router)


# ---- Health Check ----
@app.get("/api/health", tags=["Health"], summary="Health check")
async def health_check():
    """Returns service health status and active LLM provider."""
    return JSONResponse(
        content={
            "status": "healthy",
            "provider": settings.active_llm_provider,
            "version": "1.0.0",
        }
    )


# ---- Root ----
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "System Design Visualizer API",
        "docs": "/docs",
        "health": "/api/health",
    }
