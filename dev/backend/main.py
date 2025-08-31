import os
from dotenv import load_dotenv
from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from src.routers.remo import router as remo_router

# .env を読み込み
load_dotenv()

os.environ["TZ"] = "Asia/Tokyo"
os.environ["BASE_URL"] = "https://api.nature.global/"

# FastAPI アプリケーション
app = FastAPI(title="HomeIntelligence API", version="0.1.0")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(remo_router)

@app.get("/", tags=["system"])
def root():
    """
    Get the root endpoint.

    Returns:
        dict: A message indicating the backend is running.
    """
    return {"message": "HomeIntelligence backend is running"}


@app.get("/health", tags=["system"])
def health():
    """
    Get the health status of the backend.

    Returns:
        dict: A message indicating the backend is healthy.
    """
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=3000,
        log_level="info",
        reload=True,
    )