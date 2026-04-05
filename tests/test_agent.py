import uuid
from agent.agent import chat
from agent.memory import get_history, clear_session

def test_basic_response():
    session_id = str(uuid.uuid4())
    reply = chat(session_id, "What is NovaSaaS?")
    assert isinstance(reply, str)
    assert len(reply) > 0
    print(f"Response: {reply}")

def test_memory_stores_messages():
    session_id = str(uuid.uuid4())
    chat(session_id, "How do I reset my password?")
    history = get_history(session_id)
    assert len(history) == 2
    assert history[0]["role"] == "user"
    assert history[1]["role"] == "assistant"

def test_multi_turn_memory():
    session_id = str(uuid.uuid4())
    chat(session_id, "What plans do you offer?")
    chat(session_id, "What about the Enterprise plan?")
    history = get_history(session_id)
    assert len(history) == 4

def test_clear_session():
    session_id = str(uuid.uuid4())
    chat(session_id, "Hello")
    clear_session(session_id)
    history = get_history(session_id)
    assert history == []

if __name__ == "__main__":
    test_basic_response()
    test_memory_stores_messages()
    test_multi_turn_memory()
    test_clear_session()
    print("All tests passed.")