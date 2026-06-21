"""
Design generation router.
POST /api/generate
"""
from fastapi import APIRouter
from app.schemas.design import DesignRequest, DesignResponse
from app.services.design_service import generate_design
from app.services.history_service import save_design

router = APIRouter(prefix="/api", tags=["Design"])


@router.post("/generate", response_model=DesignResponse, summary="Generate system design")
async def generate_system_design(request: DesignRequest) -> DesignResponse:
    """
    Generate a complete system design analysis and architecture diagram.

    - **query**: The system design problem (e.g., "Design Netflix")

    Returns a structured analysis including requirements, components, databases,
    caches, scalability notes, bottlenecks, interview questions, and React Flow
    diagram data (nodes + edges).
    """
    design = await generate_design(request.query)
    # Auto-save to history
    await save_design(design)
    return design
