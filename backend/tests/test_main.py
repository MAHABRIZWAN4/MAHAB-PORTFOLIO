import pytest
from fastapi.testclient import TestClient
from app.main import app, limiter


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


def test_root_endpoint(client):
    """Test the root endpoint returns correct information."""
    # Arrange & Act
    response = client.get("/")

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "status" in data
    assert data["status"] == "running"


def test_health_check(client):
    """Test the health check endpoint."""
    # Arrange & Act
    response = client.get("/health")

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_ping_endpoint(client):
    """Test the ping endpoint for uptime monitoring."""
    # Arrange & Act
    response = client.get("/ping")

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "alive"
    assert "timestamp" in data


def test_invalid_route_returns_404(client):
    """Test that accessing a non-existent route returns 404."""
    # Arrange & Act
    response = client.get("/nonexistent")

    # Assert
    assert response.status_code == 404


def test_cors_header_present(client):
    """Test that CORS headers are properly set."""
    # Arrange
    headers = {"Origin": "http://localhost:3000"}

    # Act
    response = client.get("/health", headers=headers)

    # Assert
    assert response.status_code == 200
    assert "access-control-allow-origin" in response.headers


def test_health_returns_api_name(client):
    """Test that health endpoint returns the API name."""
    # Arrange & Act
    response = client.get("/health")

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert "api" in data
    api_name = data["api"].lower()
    assert "mahab" in api_name or "portfolio" in api_name
