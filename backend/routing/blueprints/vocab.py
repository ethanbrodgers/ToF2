# vocab.py: blueprint for routes related to vocabulary words

from flask import Blueprint, request, jsonify, current_app
from ..utils import serialize_list

bp = Blueprint("vocab", __name__)


# word lookup
@bp.route("/vocab", methods=["GET"])
def word_lookup_query_param():
    # access database stored in Flask instance by run.py
    # only works inside a request handler
    db = current_app.config["DB"]

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
    cursor = db["Words"].find(query)
    words = serialize_list(list(cursor))

    # return
    return jsonify({"words": words})



