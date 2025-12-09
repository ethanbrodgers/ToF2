# db.py: database initialization

from pymongo import MongoClient
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["tof2"]
