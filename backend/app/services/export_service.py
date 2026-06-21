"""
Export service for PDF and Mermaid diagram exports.
"""
from io import BytesIO
from typing import List

from app.schemas.design import DesignResponse


def generate_mermaid(design: DesignResponse) -> str:
    """Convert a DesignResponse to Mermaid diagram syntax."""
    lines = ["graph TD"]

    # Map our node types to Mermaid shapes
    shape_map = {
        "client": ("(", ")"),
        "server": ("[", "]"),
        "database": ("[(", ")]"),
        "cache": ("{{", "}}"),
        "queue": (">", "]"),
        "cdn": ("(", ")"),
        "gateway": ("[/", "\\]"),
        "service": ("[", "]"),
        "storage": ("[(", ")]"),
        "monitoring": ("[[", "]]"),
        "load_balancer": ("[/", "\\]"),
    }

    # Add node definitions
    for node in design.nodes:
        open_s, close_s = shape_map.get(node.type, ("[", "]"))
        safe_id = node.id.replace("-", "_")
        label = node.label.replace('"', "'")
        lines.append(f'    {safe_id}{open_s}"{label}"{close_s}')

    lines.append("")

    # Add edges
    for edge in design.edges:
        src = edge.source.replace("-", "_")
        tgt = edge.target.replace("-", "_")
        if edge.label:
            lines.append(f'    {src} -->|"{edge.label}"| {tgt}')
        else:
            lines.append(f"    {src} --> {tgt}")

    # Add styles
    lines.append("")
    lines.append("    classDef client fill:#4f46e5,stroke:#818cf8,color:#fff")
    lines.append("    classDef database fill:#0891b2,stroke:#22d3ee,color:#fff")
    lines.append("    classDef cache fill:#d97706,stroke:#fbbf24,color:#fff")
    lines.append("    classDef gateway fill:#7c3aed,stroke:#a78bfa,color:#fff")
    lines.append("    classDef service fill:#059669,stroke:#34d399,color:#fff")
    lines.append("    classDef cdn fill:#db2777,stroke:#f472b6,color:#fff")

    return "\n".join(lines)


def generate_pdf_bytes(design: DesignResponse) -> bytes:
    """Generate a PDF report for a system design using ReportLab."""
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import cm
        from reportlab.lib import colors
        from reportlab.platypus import (
            SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
        )
    except ImportError:
        raise RuntimeError("reportlab not installed. Run: pip install reportlab")

    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Title"],
        fontSize=24,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=12,
    )
    heading_style = ParagraphStyle(
        "CustomHeading",
        parent=styles["Heading2"],
        fontSize=14,
        textColor=colors.HexColor("#4f46e5"),
        spaceAfter=6,
        spaceBefore=12,
    )
    body_style = ParagraphStyle(
        "CustomBody",
        parent=styles["Normal"],
        fontSize=10,
        textColor=colors.HexColor("#374151"),
        spaceAfter=4,
        leftIndent=10,
    )

    story = []

    # Title
    story.append(Paragraph(design.title, title_style))
    story.append(Paragraph(f"Query: {design.query}", styles["Italic"]))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#e2e8f0")))
    story.append(Spacer(1, 0.3 * cm))

    def add_section(title: str, items: List[str]):
        story.append(Paragraph(title, heading_style))
        for item in items:
            story.append(Paragraph(f"• {item}", body_style))
        story.append(Spacer(1, 0.2 * cm))

    add_section("Functional Requirements", design.functional_requirements)
    add_section("Non-Functional Requirements", design.non_functional_requirements)
    add_section("Core Components", design.components)
    add_section("Database Recommendations", design.databases)
    add_section("Cache Layer", design.caches)
    add_section("Scalability Considerations", design.scalability_considerations)
    add_section("Potential Bottlenecks", design.bottlenecks)
    add_section("Interview Questions", design.interview_questions)

    doc.build(story)
    buffer.seek(0)
    return buffer.read()
