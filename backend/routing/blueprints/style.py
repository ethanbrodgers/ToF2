from flask import Blueprint, jsonify, request
from backend.routing.utils import serialize_list
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

