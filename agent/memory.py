from datetime import datetime

sessions: dict = {}

def get_history(session_id: str) -> list:
    return sessions.get(session_id, [])

def add_message(session_id: str, role: str, content: str):
    if session_id not in sessions:
        sessions[session_id] = []
    sessions[session_id].append({
        "role": role,
        "content": content,
        "timestamp": datetime.utcnow().isoformat()
    })

def clear_session(session_id: str):
    if session_id in sessions:
        del sessions[session_id]

def format_history(session_id: str) -> list:
    history = get_history(session_id)
    return [
        {"role": m["role"], "content": m["content"]}
        for m in history
    ]