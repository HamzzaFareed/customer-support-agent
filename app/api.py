from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
from agent.agent import chat
from agent.memory import clear_session, get_history

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    session_id: str
    message: str

@app.get("/session/new")
def new_session():
    return {"session_id": str(uuid.uuid4())}

@app.post("/chat")
def chat_endpoint(req: MessageRequest):
    reply = chat(req.session_id, req.message)
    return {"reply": reply}

@app.get("/history/{session_id}")
def get_chat_history(session_id: str):
    history = get_history(session_id)
    return {"history": history}

@app.delete("/session/{session_id}")
def delete_session(session_id: str):
    clear_session(session_id)
    return {"status": "cleared"}