"""
Pytest configuration and fixtures.

This file mocks external dependencies before any test modules are imported.
"""
import sys
from unittest.mock import MagicMock

# Mock supabase module before any imports
# This allows tests to run without installing supabase (which requires C++ build tools)
mock_supabase = MagicMock()
mock_supabase.create_client = MagicMock()
mock_supabase.Client = MagicMock()
sys.modules['supabase'] = mock_supabase
