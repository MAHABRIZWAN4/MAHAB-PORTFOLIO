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
def mock_openrouter():
    """Mock the OpenAI client to avoid real API calls."""
    with patch("app.routes.agent.OpenAI") as mock_openai:
        # Create mock client
        mock_client = MagicMock()
        mock_openai.return_value = mock_client

        # Mock the chat completion response
        mock_response = MagicMock()
        mock_response.choices = [MagicMock()]
        mock_response.choices[0].message.content = (
            "Mahab is a Full Stack Developer from Karachi"
        )
        mock_client.chat.completions.create.return_value = mock_response

        yield mock_client


# ─── TESTS ───────────────────────────────────────────────────


def test_agent_valid_question(client, mock_openrouter):
    """Test agent responds to valid question about Mahab."""
    # Arrange
    payload = {"message": "What are Mahab's skills?"}

    # Act
    response = client.post("/agent/chat", json=payload)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert "language_detected" in data
    assert data["reply"] != ""
    assert len(data["reply"]) > 0


def test_agent_guardrail_irrelevant_question(client, mock_openrouter):
    """Test agent guardrail triggers for irrelevant questions."""
    # Arrange
    mock_openrouter.chat.completions.create.return_value.choices[0].message.content = (
        "I can only answer questions about Mahab Rizwan"
    )
    payload = {"message": "What is 2+2?"}

    # Act
    response = client.post("/agent/chat", json=payload)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert "Mahab" in data["reply"]


def test_agent_empty_message_rejected(client):
    """Test that empty messages are rejected with validation error."""
    # Arrange
    payload = {"message": ""}

    # Act
    response = client.post("/agent/chat", json=payload)

    # Assert
    assert response.status_code == 422


def test_agent_missing_body_rejected(client):
    """Test that missing request body is rejected."""
    # Arrange & Act
    response = client.post("/agent/chat", json={})

    # Assert
    assert response.status_code == 422


def test_agent_urdu_question_accepted(client, mock_openrouter):
    """Test agent accepts Urdu language questions."""
    # Arrange
    payload = {"message": "ماحب کی skills کیا ہیں؟"}

    # Act
    response = client.post("/agent/chat", json=payload)

    # Assert
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data


def test_agent_long_message_rejected(client):
    """Test that messages exceeding max length are rejected."""
    # Arrange
    long_message = "a" * 501
    payload = {"message": long_message}

    # Act
    response = client.post("/agent/chat", json=payload)

    # Assert
    assert response.status_code == 422


def test_agent_service_unavailable_on_error(client):
    """Test that API errors return 503 service unavailable."""
    # Arrange
    with patch("app.routes.agent.OpenAI") as mock_openai:
        mock_openai.side_effect = Exception("API Error")
        payload = {"message": "What are Mahab's skills?"}

        # Act
        response = client.post("/agent/chat", json=payload)

        # Assert
        assert response.status_code == 503
        data = response.json()
        assert "unavailable" in data["detail"].lower()


def test_agent_rate_limit_enforced(client, mock_openrouter):
    """Test that rate limiting is enforced (20 requests per minute)."""
    # Arrange
    payload = {"message": "What are Mahab's skills?"}

    # Act - Send 21 requests
    responses = []
    for i in range(21):
        response = client.post("/agent/chat", json=payload)
        responses.append(response)

    # Assert
    # First 20 should succeed
    for i in range(20):
        assert responses[i].status_code == 200, f"Request {i+1} should succeed"

    # 21st should be rate limited
    assert responses[20].status_code == 429, "Request 21 should be rate limited"
