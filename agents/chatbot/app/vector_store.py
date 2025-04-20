from app.data_loader import load_candidates, load_job_posts, load_users
from langchain_pinecone import PineconeVectorStore
from langchain.schema import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.config import GEMINI_API_KEY, PINECONE_API_KEY, PINECONE_ENVIRONMENT, PINECONE_INDEX_NAME
from pinecone import Pinecone, ServerlessSpec

embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=GEMINI_API_KEY)

# Initialize Pinecone with the new API
pc = Pinecone(api_key=PINECONE_API_KEY)

def format_documents():
    candidates = load_candidates()
    jobposts = load_job_posts()
    users = load_users()

    # Create jobpost lookup by ID for easy reference
    jobpost_map = {str(j["_id"]): j for j in jobposts}
    docs = []

    for c in candidates:
        job_id = str(c["job_id"])  # Updated field name to match schema
        job_info = jobpost_map.get(job_id)
        job_title = job_info["title"] if job_info else "Unknown Role"
        job_location = job_info["location"] if job_info else "Unknown Location"

        text = (
            f"Candidate: {c['firstName']} {c['lastName']} applied for the role of {job_title} in {job_location}. "
            f"Email: {c['email']}, Status: {c['status']}, Experience: {c.get('experience', 'NA')} years. "
            f"Resume Summary: {c.get('resume_details', 'N/A')}. "
            f"Immediate Joiner: {'Yes' if c.get('immediateJoiner', False) else 'No'}. "
            f"Offer Letter: {'Sent' if c.get('offerletter', False) else 'Not Sent'}. "
            f"Interview Date: {c.get('interview_date', 'Not Scheduled')}"
        )

        docs.append(Document(
            page_content=text,
            metadata={"type": "candidate", "id": str(c["_id"]), "jobPostId": job_id}
        ))

    for j in jobposts:
        text = (
            f"JobPost: {j['title']} at {j['location']} ({j['jobType']}). "
            f"Openings: {j['noOfOpenings']}, Deadline: {j['deadline']}. "
            f"Status: {j['status']}. "
            f"Description: {j.get('description', 'N/A')}"
        )
        docs.append(Document(
            page_content=text,
            metadata={"type": "jobpost", "id": str(j["_id"]), "description": j.get('description', '')}
        ))

    # Add user information
    for u in users:
        text = (
            f"User: {u['name']} ({u['email']}). "
            f"Type: {u['type']}. "
            f"Role: {'HR' if u.get('ishr', False) else 'Regular'}. "
            f"Company: {'Yes' if u.get('iscompany', False) else 'No'}. "
            f"Company Code: {u.get('companyCode', 'N/A')}"
        )
        docs.append(Document(
            page_content=text,
            metadata={"type": "user", "id": str(u["_id"])}
        ))

    return docs


def create_vector_store():
    # Create Pinecone index if it doesn't exist
    if PINECONE_INDEX_NAME not in [index.name for index in pc.list_indexes()]:
        pc.create_index(
            name=PINECONE_INDEX_NAME,
            dimension=768,  # Dimension for Google's embedding model
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region=PINECONE_ENVIRONMENT
            )
        )
    
    docs = format_documents()
    
    # Create and populate the vector store
    vectordb = PineconeVectorStore.from_documents(
        documents=docs, 
        embedding=embedding, 
        index_name=PINECONE_INDEX_NAME
    )
    
    return vectordb

def get_vector_store():
    # Connect to existing Pinecone index
    # Make sure the index exists before trying to connect
    if PINECONE_INDEX_NAME not in [index.name for index in pc.list_indexes()]:
        print(f"Warning: Index {PINECONE_INDEX_NAME} does not exist. Creating it now.")
        create_vector_store()
        
    return PineconeVectorStore(
        index_name=PINECONE_INDEX_NAME,
        embedding=embedding
    )
