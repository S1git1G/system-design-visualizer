"""
Custom exception classes for the System Design Visualizer.
"""
from fastapi import Request
from fastapi.responses import JSONResponse


class InvalidPromptError(Exception):
    """Raised when the user prompt is empty or invalid."""
    def __init__(self, message: str = "Prompt cannot be empty"):
        self.message = message
        super().__init__(self.message)


class LLMTimeoutError(Exception):
    """Raised when the LLM API call times out."""
    def __init__(self, provider: str = "unknown"):
        self.message = f"LLM provider '{provider}' timed out. Please try again."
        super().__init__(self.message)


class InvalidLLMOutputError(Exception):
    """Raised when the LLM returns invalid or unparseable JSON."""
    def __init__(self, raw_output: str = ""):
        self.message = "The AI returned an unexpected response. Please try again."
        self.raw_output = raw_output
        super().__init__(self.message)


class ProviderNotConfiguredError(Exception):
    """Raised when the selected LLM provider has no API key."""
    def __init__(self, provider: str):
        self.message = f"API key for provider '{provider}' is not configured. Check your .env file."
        super().__init__(self.message)


class HistoryNotFoundError(Exception):
    """Raised when a history item is not found."""
    def __init__(self, history_id: str):
        self.message = f"History item '{history_id}' not found."
        super().__init__(self.message)


# ---- FastAPI Exception Handlers ----

async def invalid_prompt_handler(request: Request, exc: InvalidPromptError):
    return JSONResponse(status_code=400, content={"error": exc.message, "type": "invalid_prompt"})


async def llm_timeout_handler(request: Request, exc: LLMTimeoutError):
    return JSONResponse(status_code=504, content={"error": exc.message, "type": "llm_timeout"})


async def invalid_llm_output_handler(request: Request, exc: InvalidLLMOutputError):
    return JSONResponse(status_code=502, content={"error": exc.message, "type": "invalid_llm_output"})


async def provider_not_configured_handler(request: Request, exc: ProviderNotConfiguredError):
    return JSONResponse(status_code=503, content={"error": exc.message, "type": "provider_not_configured"})


async def history_not_found_handler(request: Request, exc: HistoryNotFoundError):
    return JSONResponse(status_code=404, content={"error": exc.message, "type": "not_found"})
