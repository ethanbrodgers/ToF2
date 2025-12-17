# db.py: database initialization

from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = os.getenv("MONGODB_DB_NAME")
if not db_name:
    raise ValueError("Make sure to set 'MONGODB_DB_NAME' environment variable.")
db = client[db_name] # Ex: db = client["ToF2-database"]
