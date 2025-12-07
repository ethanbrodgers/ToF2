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

# test
@app.route("/")
def home():
    return jsonify({"message": "This is my first Flask backend"})

# greet
@app.route("/greet", methods=["POST"])
def greet_with_body():
    req_body = request.get_json()
    return jsonify({"message": f"Hello {req_body.get('name')}!"})

@app.route("/greet/<name>", methods=["GET"])
def greet_with_url_param(name):
    return jsonify({"message": f"Hello {name}!"})

@app.route("/greet", methods=["GET"])
def greet_with_query_param():
    name = request.args.get("name")
    return jsonify({"message": f"Hello {name}!"})

# word lookup by en
@app.route("/vocab", methods=["GET"])
def word_lookup_query_param():
    en = request.args.get("en")
    if en:
        # search by en
        word = word_collection.find_one({"en": en})
        if word:
            word["_id"] = str(word["_id"])
            return jsonify({"word": word})
        else:
            return jsonify({"error": "word not found"}), 404
    else:
        # get all
        words = list(word_collection.find())
        for word in words:
            word["_id"] = str(word["_id"])
        return jsonify({"words": words})


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))




