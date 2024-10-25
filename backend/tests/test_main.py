from fastapi.testclient import TestClient
from app.main import app
client = TestClient(app)

# Test des routes

def test_get_calculations_csv():
    client.post("/calculate/", json={"expression": ["4", "2", "/"]})
    response = client.get("/calculations/")
    assert response.status_code == 200
    assert 'text/csv' in response.headers["Content-Type"]
    assert "4,2,/" in response.text
    assert "2.0" in response.text

def test_calculate():
    response = client.post("/calculate/", json={"expression": ["2", "3", "+"]})
    assert response.status_code == 200
    assert response.json() == {"expression": ["2", "3", "+"], "result": 5}