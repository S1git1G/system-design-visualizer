"""
Export router.
POST /api/export/pdf
POST /api/export/mermaid
"""
from fastapi import APIRouter
from fastapi.responses import Response, JSONResponse
from app.schemas.design import DesignResponse
from app.services.export_service import generate_pdf_bytes, generate_mermaid

router = APIRouter(prefix="/api/export", tags=["Export"])


@router.post("/pdf", summary="Export design as PDF")
async def export_pdf(design: DesignResponse) -> Response:
    """Generate a formatted PDF report for a system design."""
    pdf_bytes = generate_pdf_bytes(design)
    filename = design.title.replace(" ", "_").lower() + ".pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.post("/mermaid", summary="Export design as Mermaid diagram")
async def export_mermaid(design: DesignResponse) -> JSONResponse:
    """Generate a Mermaid diagram string for a system design."""
    mermaid_str = generate_mermaid(design)
    return JSONResponse(content={"mermaid": mermaid_str})
