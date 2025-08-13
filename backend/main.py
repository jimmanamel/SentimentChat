from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from textblob import TextBlob
from typing import List

app = FastAPI()
active_connections: List[WebSocket] = []

# Function to analyze sentiment
def analyze_sentiment(message: str) -> str:
    polarity = TextBlob(message).sentiment.polarity
    if polarity > 0:
        return "positive"
    elif polarity < 0:
        return "negative"
    else:
        return "neutral"

# Handle new WebSocket connections
@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            sentiment = analyze_sentiment(data)
            response = {
                "text": data,
                "sentiment": sentiment
            }
            # Broadcast message to all clients
            for connection in active_connections:
                await connection.send_json(response)
    except WebSocketDisconnect:
        active_connections.remove(websocket)
