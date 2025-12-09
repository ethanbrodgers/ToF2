# routes.py: define routes

from flask import Blueprint, request, jsonify
from db import db
from utils import serialize_list

bp = Blueprint("api", __name__)

# test (don't delete)
@bp.route("/")
def home():
    return jsonify({"message": "ToF2 backend is running"})


# word lookup
@bp.route("/vocab", methods=["GET"])
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
    cursor = db.words.find(query)
    words = serialize_list(list(cursor))

    # return
    return jsonify({"words": words})


