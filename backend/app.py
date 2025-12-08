from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# load env
load_dotenv()

# init flask
app = Flask(__name__)
CORS(app)

# connect to mongodb
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["tof2"]
word_collection = db["words"]



# === ROUTES ===

# test (don't delete)
@app.route("/")
def home():
    return jsonify({"message": "ToF2 backend is running"})


# word lookup
@app.route("/vocab", methods=["GET"])
def word_lookup_query_param():
    # get potential args
    en = request.args.get("en")
    lang = request.args.get("lang")

    # construct query
    query = {}
    if en:
        query["en"] = en
    if lang:
        query["lang"] = lang

    # get words
    words = list(word_collection.find(query))
    for word in words:
        word["_id"] = str(word["_id"])

    # return
    return jsonify({"words": words})


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))




