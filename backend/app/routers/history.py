"""
History router.
GET  /api/history
GET  /api/history/{id}
DELETE /api/history/{id}
DELETE /api/history
"""
from fastapi import APIRouter
from app.schemas.history import HistoryListResponse, HistoryItem, HistoryDeleteResponse
from app.services import history_service

router = APIRouter(prefix="/api/history", tags=["History"])


@router.get("", response_model=HistoryListResponse, summary="Get all design history")
async def get_history() -> HistoryListResponse:
    """Retrieve all saved system designs, newest first."""
    return await history_service.get_history()


@router.get("/{history_id}", response_model=HistoryItem, summary="Get a specific design")
async def get_history_item(history_id: str) -> HistoryItem:
    """Retrieve a specific saved design by ID."""
    return await history_service.get_history_item(history_id)


@router.delete("/{history_id}", response_model=HistoryDeleteResponse, summary="Delete a design")
async def delete_history_item(history_id: str) -> HistoryDeleteResponse:
    """Delete a specific saved design by ID."""
    return await history_service.delete_history_item(history_id)


@router.delete("", response_model=HistoryDeleteResponse, summary="Clear all history")
async def clear_history() -> HistoryDeleteResponse:
    """Delete all saved designs."""
    return await history_service.clear_history()
