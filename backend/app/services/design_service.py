"""
Design generation service.
Orchestrates LLM calls and maps JSON output to Pydantic models.
"""
from app.services.llm_service import get_llm_provider
from app.prompts.system_design_prompt import (
    SYSTEM_DESIGN_SYSTEM_PROMPT,
    SYSTEM_DESIGN_USER_PROMPT,
)
from app.schemas.design import DesignResponse, NodeSchema, EdgeSchema
from app.models.errors import InvalidPromptError


async def generate_design(query: str) -> DesignResponse:
    """Generate a complete system design analysis for the given query."""
    query = query.strip()
    if not query:
        raise InvalidPromptError("Please provide a system design problem.")

    provider = get_llm_provider()
    user_prompt = SYSTEM_DESIGN_USER_PROMPT.format(query=query)

    raw_json = await provider.complete_json(
        system_prompt=SYSTEM_DESIGN_SYSTEM_PROMPT,
        user_prompt=user_prompt,
    )

    # Build Pydantic model from JSON (validates types)
    response = DesignResponse(
        title=raw_json.get("title", f"{query} System Design"),
        query=query,
        functional_requirements=raw_json.get("functional_requirements", []),
        non_functional_requirements=raw_json.get("non_functional_requirements", []),
        components=raw_json.get("components", []),
        databases=raw_json.get("databases", []),
        caches=raw_json.get("caches", []),
        scalability_considerations=raw_json.get("scalability_considerations", []),
        bottlenecks=raw_json.get("bottlenecks", []),
        interview_questions=raw_json.get("interview_questions", []),
        nodes=[NodeSchema(**n) for n in raw_json.get("nodes", [])],
        edges=[EdgeSchema(**e) for e in raw_json.get("edges", [])],
    )
    return response
