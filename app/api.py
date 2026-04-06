from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
from agent.agent import chat
from agent.memory import clear_session, get_history
from agent.ingest import ingest

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    ingest()

class MessageRequest(BaseModel):
    session_id: str
    message: str

@app.get("/")
def root():
    return {"status": "ok"}

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