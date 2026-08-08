import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BASE_URL:
    # fallback: read frontend/.env
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip()
                break
BASE_URL = BASE_URL.rstrip('/')


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200


def test_create_contact_valid(client):
    payload = {
        "name": "TEST_John Doe",
        "email": "test_john@example.com",
        "company": "TEST_Acme",
        "message": "TEST_Hello from pytest"
    }
    r = client.post(f"{BASE_URL}/api/contact", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and data["id"]
    assert "created_at" in data
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]

    # verify persistence via GET
    r2 = client.get(f"{BASE_URL}/api/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert isinstance(items, list)
    ids = [i["id"] for i in items]
    assert data["id"] in ids
    # most recent first: our new one should be near the top
    top_ids = ids[:5]
    assert data["id"] in top_ids


def test_create_contact_invalid_email(client):
    r = client.post(f"{BASE_URL}/api/contact", json={
        "name": "TEST_Bad", "email": "notanemail", "message": "hi"
    })
    assert r.status_code == 422


def test_create_contact_missing_name(client):
    r = client.post(f"{BASE_URL}/api/contact", json={
        "name": "", "email": "test@example.com", "message": "hi"
    })
    assert r.status_code == 422


def test_create_contact_missing_message(client):
    r = client.post(f"{BASE_URL}/api/contact", json={
        "name": "TEST_Someone", "email": "test@example.com", "message": ""
    })
    assert r.status_code == 422
