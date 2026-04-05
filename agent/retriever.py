from pathlib import Path
import chromadb
from chromadb.utils import embedding_functions

CHROMA_PATH = Path("memory/chroma_db")
COLLECTION_NAME = "support_docs"

def get_collection():
    client = chromadb.PersistentClient(path=str(CHROMA_PATH))
    ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    return client.get_or_create_collection(
        name=COLLECTION_NAME,
        embedding_function=ef
    )

def retrieve(query: str, n_results: int = 3) -> list[str]:
    collection = get_collection()
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    return results["documents"][0]