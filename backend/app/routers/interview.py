"""
Interview practice router.
POST /api/interview
"""
from fastapi import APIRouter
from app.schemas.interview import InterviewRequest, InterviewResponse
from app.services.interview_service import generate_interview_questions

router = APIRouter(prefix="/api", tags=["Interview"])


@router.post("/interview", response_model=InterviewResponse, summary="Generate interview questions")
async def generate_interview(request: InterviewRequest) -> InterviewResponse:
    """
    Generate FAANG-style system design interview questions for a given system.

    Returns questions with hints, model answers, difficulty ratings, and follow-ups.
    """
    return await generate_interview_questions(request)
