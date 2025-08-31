import os
import requests
from fastapi import APIRouter, HTTPException

_router = APIRouter()

@_router.get("/remo/status", tags=["remo"])
def get_remo_status(device_name: str = "Remo"):
    """
    Get the status of the Remo device.

    Returns:
        dict: The status of the Remo device.
    """
    # 認証
    access_token = os.getenv("NATUREREMO_ACCESS_TOKEN")
    HEADERS = {"Authorization": f"Bearer {access_token}"}
    url = os.getenv("BASE_URL") + "1/devices"
    res = requests.get(url, headers=HEADERS, timeout=10)
    if res.status_code != 200:
        raise HTTPException(status_code=res.status_code, detail=res.text)

    devices = res.json()
    if not devices:
        raise HTTPException(status_code=404, detail="No devices found")

    # デバイスから気温と湿度を取得
    for device in devices:
        if device.get("name") == device_name:
            newest_events = device.get("newest_events", {})
            temperature = newest_events.get("te", {}).get("val")
            humidity = newest_events.get("hu", {}).get("val")
            break
    else:
        raise HTTPException(status_code=404, detail=f"Device '{device_name}' not found")

    return {
        "temperature": temperature,
        "humidity": humidity
    }

# ルーターをエクスポート
router = _router