# db.py: database initialization

from pymongo import MongoClient
import os

mongodb_uri = os.getenv("MONGODB_URI")
if not mongodb_uri:
    raise ValueError("Environment variable MONGODB_URI is not set or is empty")
client = MongoClient(mongodb_uri)

db_name = os.getenv("MONGODB_DB_NAME")
if not db_name:
    raise ValueError("Make sure to set 'MONGODB_DB_NAME' environment variable.")
db = client[db_name] # Ex: db = client["ToF2-database"]
