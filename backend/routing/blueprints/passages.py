from flask import Blueprint, jsonify, request
from ..utils import serialize_list
from services import db
from bson import ObjectId

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

# Add a passage
@bp.route("/", methods=["PUT"])
def add_passage():
    req_body = request.get_json()

    # input validation
    if not req_body:
        return jsonify({"message": "No json field provided"}), 400
    if not req_body.get("lang"):
        return jsonify({"message": "No lang field provided"}), 400
    if type(req_body["lang"]) != str:
        return jsonify({"message": "Received a non-string lang field"}), 400
    if len(req_body["lang"]) != 2:
        return jsonify({"message": "Received a lang field with length != 2"}), 400
    if not req_body.get("en"):
        return jsonify({"message": "No en field provided"}), 400
    if type(req_body["en"]) != str:
        return jsonify({"message": "Received a non-string en field"}), 400
    if not req_body.get("targ"):
        return jsonify({"message": "No targ field provided"}), 400
    if type(req_body["targ"]) != str:
        return jsonify({"message": "Received a non-string targ field"}), 400
    
    # construct passage
    passage = {}
    passage["en"] = req_body["en"]
    passage["targ"] = req_body["targ"]
    passage["lang"] = req_body["lang"]
    passage["ex"] = req_body.get("ex", [])
    passage["title"] = req_body["title"]
    passage["desc"] = req_body["desc"]

    # add
    db["Passages"].insert_one(passage)

    # return
    return jsonify({"message": "success"})

# delete a passage
@bp.route("/<id_str>", methods=["DELETE"])
def delete_passage(id_str):

    # search for a rule to delete
    cursor = db["Passages"].find({
        "$or": [
            {
                "_id": id_str
            },
            {
                "_id": ObjectId(id_str)
            }
        ]
    })
    num_found = len(list(cursor))

    # if none found, error
    if num_found == 0:
        return jsonify({"message": "no passage found with given _id"}), 404

    # delete
    db["Passages"].delete_many({
        "$or": [
            {
                "_id": id_str
            },
            {
                "_id": ObjectId(id_str)
            }
        ]
    })

    return jsonify({"message": "success"})