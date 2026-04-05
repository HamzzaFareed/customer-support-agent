# NovaSaaS Customer Support Agent

An AI-powered customer support agent with RAG and conversation memory, built with Groq, ChromaDB, and LangChain.

## Stack
- LLM: Groq (llama3-8b-8192)
- Vector DB: ChromaDB (local)
- Embeddings: sentence-transformers (all-MiniLM-L6-v2)
- Framework: LangChain
- CLI: Rich

## Setup

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Add your Groq API key to .env:
GROQ_API_KEY=your_key_here

## Run

python -m agent.ingest
python -m app.main

## Test

python tests/test_agent.py