"""
Design history service.
Persists design history to a local JSON file.
"""
import json
import uuid
import asyncio
import aiofiles
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Optional

from app.config.settings import settings
from app.schemas.design import DesignResponse
from app.schemas.history import HistoryItem, HistoryListResponse, HistoryDeleteResponse
from app.models.errors import HistoryNotFoundError


def _get_history_path() -> Path:
    path = Path(settings.history_file_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    return path


async def _read_history() -> List[dict]:
    path = _get_history_path()
    if not path.exists():
        return []
    try:
        async with aiofiles.open(path, "r", encoding="utf-8") as f:
            content = await f.read()
            return json.loads(content) if content.strip() else []
    except (json.JSONDecodeError, OSError):
        return []


async def _write_history(history: List[dict]) -> None:
    path = _get_history_path()
    async with aiofiles.open(path, "w", encoding="utf-8") as f:
        await f.write(json.dumps(history, indent=2, default=str))


async def save_design(design: DesignResponse) -> HistoryItem:
    """Save a design to history and return the history item."""
    history = await _read_history()
    item = HistoryItem(
        id=str(uuid.uuid4()),
        query=design.query,
        title=design.title,
        created_at=datetime.now(timezone.utc),
        design=design,
    )
    # Prepend (newest first)
    history.insert(0, json.loads(item.model_dump_json()))
    # Keep last 50 designs
    history = history[:50]
    await _write_history(history)
    return item


async def get_history() -> HistoryListResponse:
    """Get all saved designs."""
    history = await _read_history()
    items = [HistoryItem(**item) for item in history]
    return HistoryListResponse(items=items, total=len(items))


async def get_history_item(history_id: str) -> HistoryItem:
    """Get a specific history item by ID."""
    history = await _read_history()
    for item in history:
        if item.get("id") == history_id:
            return HistoryItem(**item)
    raise HistoryNotFoundError(history_id)


async def delete_history_item(history_id: str) -> HistoryDeleteResponse:
    """Delete a history item by ID."""
    history = await _read_history()
    new_history = [item for item in history if item.get("id") != history_id]
    if len(new_history) == len(history):
        raise HistoryNotFoundError(history_id)
    await _write_history(new_history)
    return HistoryDeleteResponse(success=True, message=f"Design '{history_id}' deleted.")


async def clear_history() -> HistoryDeleteResponse:
    """Clear all history."""
    await _write_history([])
    return HistoryDeleteResponse(success=True, message="All history cleared.")
