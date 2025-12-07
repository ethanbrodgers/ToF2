import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://ethanbrodgers:YpC7ePjFA5OYfaf5@personal.ixiji9y.mongodb.net/?appName=personal")
db = cluster["tof2"]
collection = db["words"]

# collection.insert_one({"en": "book", "target": "livre"})
# collection.insert_many([{"en": "cat", "target": "chat"}, {"en": "dog", "target": "chien"}])

results = collection.find({"en": "book"})
for result in results:
    print(result)
