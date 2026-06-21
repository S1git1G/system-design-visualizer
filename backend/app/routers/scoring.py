"""
Scoring router.
POST /api/score
"""
from fastapi import APIRouter
from app.schemas.scoring import ScoringRequest, ScoringResponse
from app.services.scoring_service import score_design

router = APIRouter(prefix="/api", tags=["Scoring"])


@router.post("/score", response_model=ScoringResponse, summary="Score a system design")
async def score_system_design(request: ScoringRequest) -> ScoringResponse:
    """
    Score a system design across 5 dimensions:
    Scalability, Reliability, Database Design, Caching Strategy, Architecture Clarity.

    Returns an overall score (0-100), letter grade, per-dimension scores,
    strengths, and improvement suggestions.
    """
    return await score_design(request)
