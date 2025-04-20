from pymongo import MongoClient
from app.config import MONGO_URI

client = MongoClient(MONGO_URI)
db = client["RecruitOps"]  # Keep the database name as is

def load_candidates():
    # Updated to match the Application collection name
    return list(db["Application"].find({}))

def load_job_posts():
    # Updated to match the JobPost collection name
    return list(db["JobPost"].find({}))

def load_users():
    # Updated to match the User collection name
    return list(db["User"].find({}))

