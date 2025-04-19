from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")
VECTOR_DIR = "./chroma_db"
# Add these lines to your existing config file
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = "us-east-1"  # e.g., "gcp-starter"
PINECONE_INDEX_NAME = "recruitopsvectordb"