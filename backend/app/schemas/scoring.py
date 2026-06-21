"""
Pydantic schemas for architecture scoring.
"""
from pydantic import BaseModel, Field
from typing import List


class ScoreDimension(BaseModel):
    name: str
    score: int = Field(..., ge=0, le=100)
    feedback: str
    suggestions: List[str]


class ScoringRequest(BaseModel):
    design_title: str
    components: List[str]
    databases: List[str]
    caches: List[str]
    scalability_considerations: List[str]
    bottlenecks: List[str]


class ScoringResponse(BaseModel):
    overall_score: int = Field(..., ge=0, le=100)
    grade: str  # A+, A, B+, B, C, D
    dimensions: List[ScoreDimension]
    summary: str
    strengths: List[str]
    improvements: List[str]
