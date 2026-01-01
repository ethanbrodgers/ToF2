from flask import Blueprint, jsonify, request
from ..utils import serialize_list
from services import db

bp = Blueprint("passages", __name__)

# Retrieve passages from DB
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
                "desc": {
                    "$regex": kw,
                    "$options": "i"
                }
            },
            {
                "en": {
                    "$regex": kw,
                    "$options": "i"
                }
            },
            {
                "targ": {
                    "$regex": kw,
                    "$options": "i"
                }
            },
        ]
    
    # Retrieve passages from DB
    cursor = db["Passages"].find(query)
    norms = serialize_list(cursor)

    return jsonify({"passages": norms})