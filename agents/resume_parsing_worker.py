# resume_parsing_worker.py
import os
import io
import boto3
import pymongo
import zipfile
import pypdf
from docx import Document
from botocore.exceptions import ClientError
from dotenv import load_dotenv

# Load credentials
load_dotenv()
MONGO_DB_URI = os.getenv("MONGO_DB_URI")
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")
AWS_S3_BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")

# AWS S3 client
s3_client = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_REGION
)

# MongoDB client and collection
mongo_client = pymongo.MongoClient(MONGO_DB_URI)
db = mongo_client.get_default_database()
applications_collection = db["applications"]

def extract_text_from_cv(s3_client, bucket_name, object_key):
    # … identical to original extract_text_from_cv …
    # :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
    # (omitted here for brevity)
    pass

def process_new_application(document):
    app_id = document["_id"]
    s3_file_key = document.get("s3FileKey")
    if not s3_file_key:
        return
    resume_text = extract_text_from_cv(s3_client, AWS_S3_BUCKET_NAME, s3_file_key)
    if resume_text:
        applications_collection.update_one(
            {"_id": app_id},
            {"$set": {"resume_details": resume_text}}
        )

def initial_process_applications():
    """One-time pass to catch any existing docs missing resume_details."""
    pending = applications_collection.find(
        {"resume_details": {"$exists": False}}
    )
    
    # Track the count manually
    processed_count = 0
    for doc in pending:
        process_new_application(doc)
        processed_count += 1
        
    print(f"Initial pass complete: processed {processed_count} existing applications.")

def watch_applications_change_stream():
    """
    Open a change stream on the Applications collection to listen for new insert events.
    When a new document is detected, process the resume extraction.
    """
    try:
        pipeline = [
            {"$match": {"operationType": "insert"}}
        ]
        with applications_collection.watch(pipeline, full_document='updateLookup') as change_stream:
            print("Listening for new application documents...")
            for change in change_stream:
                full_doc = change.get("fullDocument")
                if full_doc:
                    # Process only if resume_details is not already present.
                    if not full_doc.get("resume_details"):
                        process_new_application(full_doc)
                    else:
                        print(f"Application ID {full_doc.get('_id')} already contains resume_details. Skipping.")
    except Exception as e:
        print(f"Error in change stream: {e}")

if __name__ == "__main__":
    print("Starting the Resume Parsing Background Worker…")
    initial_process_applications()
    watch_applications_change_stream()
