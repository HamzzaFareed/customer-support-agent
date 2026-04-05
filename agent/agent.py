import os
from dotenv import load_dotenv
from groq import Groq
from agent.retriever import retrieve
from agent.memory import add_message, format_history

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"

SYSTEM_PROMPT = """You are a helpful and friendly customer support agent for NovaSaaS, a cloud-based project management platform.

You have access to relevant documentation that will be provided to you as context. Use it to answer the user's question accurately.

Rules:
- Only answer questions related to NovaSaaS.
- If the answer is not in the context, say you don't have that information and suggest the user contact support@novasaas.com.
- Keep answers concise, clear, and friendly.
- Never make up features, prices, or policies.
- If the user seems frustrated, acknowledge it before answering."""

def chat(session_id: str, user_message: str) -> str:
    context_chunks = retrieve(user_message)
    context = "\n\n".join(context_chunks)

    history = format_history(session_id)

    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Use the following documentation as context to answer the question.\n\nContext:\n{context}"},
        {"role": "assistant", "content": "Understood. I will use this context to answer the user's questions accurately."},
        *history,
        {"role": "user", "content": user_message}
    ]

    response = client.chat.completions.create(
        model=MODEL,
        messages=messages,
        temperature=0.3,
        max_tokens=512
    )

    reply = response.choices[0].message.content

    add_message(session_id, "user", user_message)
    add_message(session_id, "assistant", reply)

    return reply