import requests
import os
from base64 import b64encode

def generate_zoom_oauth_token():
    """Generate OAuth token for Zoom API authentication"""
    
    url = "https://zoom.us/oauth/token"
    client_id = os.getenv("ZOOM_CLIENT_ID")
    client_secret = os.getenv("ZOOM_CLIENT_SECRET")
    account_id = os.getenv("ZOOM_ACCOUNT_ID")

    if not client_id or not client_secret or not account_id:
        print("Error: Zoom API credentials are missing in the .env file")
        return None

    auth_header = b64encode(f"{client_id}:{client_secret}".encode()).decode()

    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    payload = {"grant_type": "account_credentials", "account_id": account_id}
    
    response = requests.post(url, headers=headers, data=payload)
    
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        print("Error fetching Zoom token:", response.json())  
        return None
