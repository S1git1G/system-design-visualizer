"""
Pydantic schemas for design history.
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from .design import DesignResponse


class HistoryItem(BaseModel):
    id: str
    query: str
    title: str
    created_at: datetime
    design: DesignResponse


class HistoryListResponse(BaseModel):
    items: List[HistoryItem]
    total: int


class HistoryDeleteResponse(BaseModel):
    success: bool
    message: str
