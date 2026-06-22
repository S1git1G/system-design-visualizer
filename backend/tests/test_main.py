from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_read_root():
    """Test the root endpoint returns API links and documentation paths."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "System Design Visualizer API" in data["message"]
    assert "docs" in data
    assert "health" in data


def test_health_check():
    """Test the health check endpoint returns 200 OK and healthy status."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "provider" in data
    assert "version" in data


def test_404_not_found():
    """Test accessing a non-existent endpoint returns 404."""
    response = client.get("/api/non-existent-route")
    assert response.status_code == 404
