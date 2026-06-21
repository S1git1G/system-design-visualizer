"""
Pydantic schemas for interview practice mode.
"""
from pydantic import BaseModel
from typing import List, Optional


class InterviewQuestion(BaseModel):
    id: str
    question: str
    category: str  # scalability | database | architecture | tradeoffs | estimation
    difficulty: str  # easy | medium | hard
    hint: Optional[str] = None
    model_answer: str
    follow_ups: List[str]


class InterviewRequest(BaseModel):
    design_title: str
    components: List[str]
    num_questions: int = 5


class InterviewResponse(BaseModel):
    design_title: str
    questions: List[InterviewQuestion]
