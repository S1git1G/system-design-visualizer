"""
Provider-agnostic LLM service.
Supports OpenAI (GPT-4o) and Anthropic (Claude 3.5 Sonnet).
Includes retry logic and JSON validation.
"""
import json
import asyncio
from abc import ABC, abstractmethod
from typing import Any, Dict

from app.config.settings import settings
from app.models.errors import (
    InvalidLLMOutputError,
    LLMTimeoutError,
    ProviderNotConfiguredError,
)


class BaseLLMProvider(ABC):
    """Abstract base class for all LLM providers."""

    @abstractmethod
    async def complete(self, system_prompt: str, user_prompt: str) -> str:
        """Send a completion request and return the raw string response."""
        pass

    async def complete_json(self, system_prompt: str, user_prompt: str) -> Dict[str, Any]:
        """Call complete() and parse the result as JSON. Retries up to 2 times."""
        last_error = None
        for attempt in range(3):
            try:
                raw = await self.complete(system_prompt, user_prompt)
                # Strip any accidental markdown fences
                raw = raw.strip()
                if raw.startswith("```"):
                    raw = raw.split("```")[1]
                    if raw.startswith("json"):
                        raw = raw[4:]
                raw = raw.strip()
                return json.loads(raw)
            except json.JSONDecodeError as e:
                last_error = InvalidLLMOutputError(raw_output=str(e))
                if attempt < 2:
                    await asyncio.sleep(1)
                continue
            except asyncio.TimeoutError:
                raise LLMTimeoutError(provider=self.__class__.__name__)
        raise last_error


class OpenAIProvider(BaseLLMProvider):
    """OpenAI GPT provider."""

    def __init__(self):
        if not settings.openai_api_key:
            raise ProviderNotConfiguredError("openai")
        try:
            from openai import AsyncOpenAI
            self.client = AsyncOpenAI(api_key=settings.openai_api_key)
            self.model = settings.openai_model
        except ImportError:
            raise RuntimeError("openai package not installed. Run: pip install openai")

    async def complete(self, system_prompt: str, user_prompt: str) -> str:
        try:
            response = await asyncio.wait_for(
                self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt},
                    ],
                    temperature=0.7,
                    response_format={"type": "json_object"},
                ),
                timeout=120.0,
            )
            return response.choices[0].message.content
        except asyncio.TimeoutError:
            raise LLMTimeoutError(provider="openai")


class AnthropicProvider(BaseLLMProvider):
    """Anthropic Claude provider."""

    def __init__(self):
        if not settings.anthropic_api_key:
            raise ProviderNotConfiguredError("anthropic")
        try:
            import anthropic
            self.client = anthropic.AsyncAnthropic(api_key=settings.anthropic_api_key)
            self.model = settings.anthropic_model
        except ImportError:
            raise RuntimeError("anthropic package not installed. Run: pip install anthropic")

    async def complete(self, system_prompt: str, user_prompt: str) -> str:
        try:
            response = await asyncio.wait_for(
                self.client.messages.create(
                    model=self.model,
                    max_tokens=8192,
                    system=system_prompt,
                    messages=[{"role": "user", "content": user_prompt}],
                ),
                timeout=120.0,
            )
            return response.content[0].text
        except asyncio.TimeoutError:
            raise LLMTimeoutError(provider="anthropic")


class LLMServiceFactory:
    """Factory that returns the correct provider based on settings."""

    @staticmethod
    def get_provider() -> BaseLLMProvider:
        provider = settings.active_llm_provider.lower()
        if provider == "openai":
            return OpenAIProvider()
        elif provider == "anthropic":
            return AnthropicProvider()
        else:
            raise ValueError(f"Unknown LLM provider: '{provider}'. Use 'openai' or 'anthropic'.")


# Singleton-style cached provider (re-created if settings change)
_provider_instance: BaseLLMProvider | None = None


def get_llm_provider() -> BaseLLMProvider:
    """Get or create the LLM provider singleton."""
    global _provider_instance
    if _provider_instance is None:
        _provider_instance = LLMServiceFactory.get_provider()
    return _provider_instance
