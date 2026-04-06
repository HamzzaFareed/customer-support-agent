import os
import requests
from pathlib import Path
from dotenv import load_dotenv
import chromadb

load_dotenv()

CHROMA_PATH = Path("memory/chroma_db")
COLLECTION_NAME = "support_docs"
HF_TOKEN = os.getenv("HF_TOKEN")
EMBED_URL = "https://router.huggingface.co/hf-inference/models/sentence-transformers/all-MiniLM-L6-v2/pipeline/feature-extraction"

def get_embedding(text):
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    response = requests.post(EMBED_URL, headers=headers, json={"inputs": [text]})
    result = response.json()
    item = result[0]
    if isinstance(item, list) and isinstance(item[0], list):
        return item[0]
    return item

def retrieve(query: str, n_results: int = 3) -> list[str]:
    client = chromadb.PersistentClient(path=str(CHROMA_PATH))
    collection = client.get_or_create_collection(name=COLLECTION_NAME)
    embedding = get_embedding(query)
    results = collection.query(query_embeddings=[embedding], n_results=n_results)
    return results["documents"][0]