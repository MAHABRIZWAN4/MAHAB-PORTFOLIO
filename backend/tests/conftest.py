"""
Pytest configuration and fixtures.

This file mocks external dependencies before any test modules are imported.
"""
import sys
import os
from unittest.mock import MagicMock

# Set up test environment variables before any imports
os.environ.setdefault("OPENROUTER_API_KEY", "test_openrouter_key")
os.environ.setdefault("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
os.environ.setdefault("OPENROUTER_MODEL", "google/gemma-4-31b-it:free")
os.environ.setdefault("GROQ_API_KEY", "test_groq_key")
os.environ.setdefault("GROQ_BASE_URL", "https://api.groq.com/openai/v1")
os.environ.setdefault("GROQ_MODEL", "llama-3.3-70b-versatile")
os.environ.setdefault("SUPABASE_URL", "https://test.supabase.co")
os.environ.setdefault("SUPABASE_KEY", "test_supabase_key")
os.environ.setdefault("ALLOWED_ORIGINS", "http://localhost:3000")

# Mock supabase module before any imports
# This allows tests to run without installing supabase (which requires C++ build tools)
mock_supabase = MagicMock()
mock_supabase.create_client = MagicMock()
mock_supabase.Client = MagicMock()
sys.modules['supabase'] = mock_supabase
