# Sentiment App

A full-stack app using:

- 🐍 FastAPI (Python backend with WebSocket + TextBlob)
- ⚛️ React (Vite frontend)
- 💬 Real-time sentiment analysis

## Structure

- `frontend/`: React + Vite frontend
- `backend/`: FastAPI WebSocket backend

## Setup Instructions

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn server:app --reload

### frontend

cd frontend
npm install
npm run dev
