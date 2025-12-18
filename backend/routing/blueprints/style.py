from flask import Blueprint, jsonify, request
from ..utils import serialize_list
from services import db

bp = Blueprint("style", __name__)

# Retrieve style norm from DB
@bp.route("/", methods=["GET"])
def get_style_norms():
    lang = request.args.get("lang")
    kw = request.args.get("kw")

    # Build MongoDB query
    query = {}
    if lang:
        query["lang"] = lang
    if kw:
        query["$or"] = [
            {
                "title": {
                    "$regex": kw,
                    "$options": "i"
                }
            },
            {
                "def": {
                    "$regex": kw,
                    "$options": "i"
                }
            }
        ]
    
    # Retrieve style norm from DB
    cursor = db["Norms"].find(query)
    norms = serialize_list(cursor)

    return jsonify({"norms": norms})

# Add style norm to DB
@bp.route("/", methods=["PUT"])
def set_style_norms():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No input data provided"}), 400

    # 1. Validate lang
    lang = data.get("lang")
    if not lang or not isinstance(lang, str) or len(lang) != 2:
        return jsonify({"error": "Field 'lang' is required and must be a 2-character string"}), 400

    # 2. Validate title
    title = data.get("title")
    if not title or not isinstance(title, str):
        return jsonify({"error": "Field 'title' is required and must be a string"}), 400

    # 3. Handle optional fields with defaults
    definition = data.get("def", "[none provided]")
    
    notes = data.get("notes", [])
    if not isinstance(notes, list):
        return jsonify({"error": "Field 'notes' must be a list"}), 400

    ex = data.get("ex", [])
    if not isinstance(ex, list):
        return jsonify({"error": "Field 'ex' must be a list"}), 400

    # Construct the document to insert
    norm_doc = {
        "title": title,
        "lang": lang,
        "def": definition,
        "notes": notes,
        "ex": ex
    }

    # Insert into database
    db["Norms"].insert_one(norm_doc)

    return jsonify({"message": "success"})
