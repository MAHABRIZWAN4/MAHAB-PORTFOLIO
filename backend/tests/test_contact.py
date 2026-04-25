import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
from app.main import app, limiter


# ─── FIXTURES ────────────────────────────────────────────────


@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    return TestClient(app)


@pytest.fixture(autouse=True)
def reset_rate_limiter():
    """Reset rate limiter storage before and after each test."""
    # Reset before test
    limiter.reset()
    yield
    # Reset after test
    limiter.reset()


@pytest.fixture
def mock_supabase():
    """Mock the Supabase client to avoid real database calls."""
    with patch("app.routes.contact.get_client") as mock_get_client:
        # Create mock Supabase client
        mock_client = MagicMock()
        mock_get_client.return_value = mock_client

        # Mock successful insert response
        mock_result = MagicMock()
        mock_result.data = [{"id": "test-uuid", "name": "Test User"}]
        mock_client.table.return_value.insert.return_value.execute.return_value = mock_result

        yield mock_client


# ─── TESTS ───────────────────────────────────────────────────


def test_contact_valid_submission(client, mock_supabase):
    """Test successful contact form submission with valid data."""
    # Arrange
    payload = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Interested in collaboration",
        "message": "Hi Mahab, I would like to discuss a potential project with you. Please contact me at your earliest convenience."
    }

    # Act
    response = client.post("/contact/send", json=payload)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "message" in data
    assert "successfully" in data["message"].lower()


def test_contact_invalid_email(client, mock_supabase):
    """Test that invalid email format is rejected."""
    # Arrange
    payload = {
        "name": "John Doe",
        "email": "not-an-email",
        "subject": "Test Subject",
        "message": "This is a test message that is long enough to pass validation."
    }

    # Act
    response = client.post("/contact/send", json=payload)

    # Assert
    assert response.status_code == 422


def test_contact_short_message(client, mock_supabase):
    """Test that messages shorter than 20 characters are rejected."""
    # Arrange
    payload = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Test Subject",
        "message": "Too short"
    }

    # Act
    response = client.post("/contact/send", json=payload)

    # Assert
    assert response.status_code == 422


def test_contact_missing_fields(client):
    """Test that missing required fields are rejected."""
    # Arrange
    payload = {}

    # Act
    response = client.post("/contact/send", json=payload)

    # Assert
    assert response.status_code == 422


def test_contact_rate_limit(client, mock_supabase):
    """Test that rate limiting is enforced (3 requests per hour)."""
    # Arrange
    payload = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Test Subject",
        "message": "This is a test message that is long enough to pass validation."
    }

    # Act - Send 4 requests
    responses = []
    for i in range(4):
        response = client.post("/contact/send", json=payload)
        responses.append(response)

    # Assert
    # First 3 should succeed
    for i in range(3):
        assert responses[i].status_code == 200, f"Request {i+1} should succeed"

    # 4th should be rate limited
    assert responses[3].status_code == 429, "Request 4 should be rate limited"


def test_contact_name_too_short(client, mock_supabase):
    """Test that names shorter than 2 characters are rejected."""
    # Arrange
    payload = {
        "name": "A",
        "email": "john@example.com",
        "subject": "Test Subject",
        "message": "This is a test message that is long enough to pass validation."
    }

    # Act
    response = client.post("/contact/send", json=payload)

    # Assert
    assert response.status_code == 422


def test_contact_subject_too_short(client, mock_supabase):
    """Test that subjects shorter than 5 characters are rejected."""
    # Arrange
    payload = {
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Hi",
        "message": "This is a test message that is long enough to pass validation."
    }

    # Act
    response = client.post("/contact/send", json=payload)

    # Assert
    assert response.status_code == 422


def test_contact_database_error(client):
    """Test that database errors are handled gracefully."""
    # Arrange
    with patch("app.routes.contact.get_client") as mock_get_client:
        # Mock database error
        mock_get_client.side_effect = ValueError("Database connection failed")

        payload = {
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Test Subject",
            "message": "This is a test message that is long enough to pass validation."
        }

        # Act
        response = client.post("/contact/send", json=payload)

        # Assert
        assert response.status_code == 500
        data = response.json()
        assert "unavailable" in data["detail"].lower()
