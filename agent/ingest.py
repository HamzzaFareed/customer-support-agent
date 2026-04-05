import os
import requests
from pathlib import Path
from dotenv import load_dotenv
import chromadb
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

DOCS_PATH = Path("data/docs")
CHROMA_PATH = Path("memory/chroma_db")
COLLECTION_NAME = "support_docs"
HF_TOKEN = os.getenv("HF_TOKEN")
EMBED_URL = "https://router.huggingface.co/hf-inference/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def get_embeddings(texts):
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    response = requests.post(EMBED_URL, headers=headers, json={"inputs": texts, "options": {"wait_for_model": True}})
    result = response.json()
    embeddings = []
    for item in result:
        if isinstance(item, list) and len(item) > 0 and isinstance(item[0], list):
            embeddings.append(item[0])
        else:
            embeddings.append(item)
    return embeddings

def load_documents():
    docs = []
    for file in DOCS_PATH.iterdir():
        if file.suffix == ".txt":