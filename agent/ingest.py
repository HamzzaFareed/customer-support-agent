import os
from pathlib import Path
from dotenv import load_dotenv
import chromadb
from chromadb.utils import embedding_functions
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

DOCS_PATH = Path("data/docs")
CHROMA_PATH = Path("memory/chroma_db")
COLLECTION_NAME = "support_docs"

def load_documents():
    docs = []
    for file in DOCS_PATH.iterdir():
        if file.suffix == ".txt":
            loader = TextLoader(str(file))
            docs.extend(loader.load())
        elif file.suffix == ".pdf":
            loader = PyPDFLoader(str(file))
            docs.extend(loader.load())
    return docs

def chunk_documents(docs):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )
    return splitter.split_documents(docs)

def ingest():
    client = chromadb.PersistentClient(path=str(CHROMA_PATH))
    ef = embedding_functions.SentenceTransformerEmbeddingFunction(
        model_name="all-MiniLM-L6-v2"
    )
    collection = client.get_or_create_collection(
        name=COLLECTION_NAME,
        embedding_function=ef
    )
    docs = load_documents()
    chunks = chunk_documents(docs)
    documents = [c.page_content for c in chunks]
    ids = [f"doc_{i}" for i in range(len(documents))]
    metadatas = [c.metadata for c in chunks]
    collection.add(documents=documents, ids=ids, metadatas=metadatas)
    print(f"Ingested {len(documents)} chunks into ChromaDB.")

if __name__ == "__main__":
    ingest()