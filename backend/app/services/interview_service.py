"""
Interview practice service.
"""
from app.services.llm_service import get_llm_provider
from app.prompts.interview_prompt import INTERVIEW_SYSTEM_PROMPT, INTERVIEW_USER_PROMPT
from app.schemas.interview import InterviewRequest, InterviewResponse, InterviewQuestion


async def generate_interview_questions(request: InterviewRequest) -> InterviewResponse:
    """Generate interview questions for a system design."""
    provider = get_llm_provider()
    user_prompt = INTERVIEW_USER_PROMPT.format(
        design_title=request.design_title,
        components=", ".join(request.components),
        num_questions=request.num_questions,
    )

    raw_json = await provider.complete_json(
        system_prompt=INTERVIEW_SYSTEM_PROMPT,
        user_prompt=user_prompt,
    )

    response = InterviewResponse(
        design_title=raw_json.get("design_title", request.design_title),
        questions=[InterviewQuestion(**q) for q in raw_json.get("questions", [])],
    )
    return response
