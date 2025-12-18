from flask import Blueprint, jsonify, request
from ..utils import serialize_list
from services import db

bp = Blueprint("grammar", __name__)


# rule lookup
@bp.route("/", methods=["GET"])
def rule_lookup_query_param():

    # get potential args
    lang = request.args.get("lang")
    kw = request.args.get("kw")

    # construct query
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

    # get words
    cursor = db["Rules"].find(query)
    rules = serialize_list(list(cursor))

    # return
    return jsonify({"rules": rules})

# add a rule
@bp.route("/", methods=["PUT"])
def add_rule():
    req_body = request.get_json()

    # input validation
    if not req_body.get("lang"):
        return jsonify({"message": "No lang field provided"}), 400
    if type(req_body["lang"]) != str:
        return jsonify({"message": "Received a non-string lang field"}), 400
    if len(req_body["lang"]) != 2:
        return jsonify({"message": "Received a lang field with length != 2"}), 400
    if not req_body.get("title"):
        return jsonify({"message": "No title field provided"}), 400
    if type(req_body["title"]) != str:
        return jsonify({"message": "Received a non-string title field"}), 400
    
    # construct rule
    rule = {}
    rule["title"] = req_body["title"]
    rule["lang"] = req_body["lang"]
    rule["def"] = req_body.get("def") if req_body.get("def") else "[none provided]"
    rule["notes"] = req_body.get("notes") if req_body.get("notes") else []
    rule["ex"] = req_body.get("ex") if req_body.get("ex") else []

    # add
    db["Rules"].insert_one(rule)

    # return
    return jsonify({"message": "success"})

