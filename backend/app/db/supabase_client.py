from supabase import create_client, Client
from app.config import settings


def get_client() -> Client:
    """
    Initialize and return Supabase client.

    Raises:
        ValueError: If Supabase credentials are missing or invalid.
    """
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise ValueError(
            "Supabase credentials missing. "
            "Please set SUPABASE_URL and SUPABASE_KEY in .env file."
        )

    try:
        client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        return client
    except Exception as e:
        raise ValueError(f"Failed to initialize Supabase client: {str(e)}")
