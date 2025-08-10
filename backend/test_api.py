"""
Simple test script for DSCPL API endpoints
Run this after starting the server to test basic functionality
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test health endpoint"""
    print("Testing health check...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_root_endpoint():
    """Test root endpoint"""
    print("\nTesting root endpoint...")
    response = requests.get(f"{BASE_URL}/")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code == 200

def test_user_registration():
    """Test user registration"""
    print("\nTesting user registration...")
    user_data = {
        "email": "test@example.com",
        "name": "Test User",
        "password": "testpassword123",
        "spiritual_path": "bhakti",
        "ishta_devata": "krishna"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/auth/register", json=user_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response.status_code in [200, 400]  # 400 if user already exists

def test_user_login():
    """Test user login"""
    print("\nTesting user login...")
    login_data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    
    response = requests.post(f"{BASE_URL}/api/v1/auth/login", json=login_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        token = response.json()["data"]["access_token"]
        return token
    return None

def test_sample_content():
    """Test sample content endpoint"""
    print("\nTesting sample content...")
    
    # First login to get token
    token = test_user_login()
    if not token:
        print("Could not get authentication token")
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/api/v1/ai/sample-content/combined", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    return response.status_code == 200

def run_all_tests():
    """Run all tests"""
    print("=" * 50)
    print("DSCPL API Test Suite")
    print("=" * 50)
    
    tests = [
        test_health_check,
        test_root_endpoint,
        test_user_registration,
        test_user_login,
        test_sample_content
    ]
    
    passed = 0
    for test in tests:
        try:
            if test():
                passed += 1
                print("✅ PASSED")
            else:
                print("❌ FAILED")
        except Exception as e:
            print(f"❌ ERROR: {e}")
        print("-" * 50)
    
    print(f"Tests passed: {passed}/{len(tests)}")

if __name__ == "__main__":
    run_all_tests()
