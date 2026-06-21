"""
Architecture scoring service.
"""
from app.services.llm_service import get_llm_provider
from app.prompts.scoring_prompt import SCORING_SYSTEM_PROMPT, SCORING_USER_PROMPT
from app.schemas.scoring import ScoringRequest, ScoringResponse, ScoreDimension


async def score_design(request: ScoringRequest) -> ScoringResponse:
    """Score a system design across multiple dimensions using LLM."""
    provider = get_llm_provider()
    user_prompt = SCORING_USER_PROMPT.format(
        design_title=request.design_title,
        components=", ".join(request.components),
        databases=", ".join(request.databases),
        caches=", ".join(request.caches),
        scalability=", ".join(request.scalability_considerations),
        bottlenecks=", ".join(request.bottlenecks),
    )

    raw_json = await provider.complete_json(
        system_prompt=SCORING_SYSTEM_PROMPT,
        user_prompt=user_prompt,
    )

    response = ScoringResponse(
        overall_score=raw_json.get("overall_score", 70),
        grade=raw_json.get("grade", "B"),
        dimensions=[ScoreDimension(**d) for d in raw_json.get("dimensions", [])],
        summary=raw_json.get("summary", ""),
        strengths=raw_json.get("strengths", []),
        improvements=raw_json.get("improvements", []),
    )
    return response
