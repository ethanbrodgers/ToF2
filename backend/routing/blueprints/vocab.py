# vocab.py: blueprint for routes related to vocabulary words

from flask import Blueprint, request, jsonify, current_app
from bson import ObjectId
from ..utils import serialize_list
from services import db

bp = Blueprint("vocab", __name__)


# word lookup
@bp.route("/", methods=["GET"])
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
    cursor = db["Words"].find(query)
    words = serialize_list(list(cursor))

    # return
    return jsonify({"words": words})

# add a word
@bp.route("/vocab", methods=["PUT"])
def add_word():
    req_body = request.get_json()

    # input validation
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
    if not req_body.get("pos"):
        return jsonify({"message": "No pos field provided"}), 400
    if req_body["pos"] not in ["n", "p", "v", "adj", "adv", "c", "i", "q"]:
        return jsonify({"message": "Received a pos field not in recognized list"}), 400
    
    # construct word
    word = {}
    word["en"] = req_body["en"]
    word["targ"] = req_body["targ"]
    word["lang"] = req_body["lang"]
    word["pos"] = req_body["pos"]
    word["def"] = req_body.get("def") if req_body.get("def") else "[none provided]"
    word["gender"] = req_body.get("gender") if req_body.get("gender") else None
    word["trans"] = req_body.get("trans") if req_body.get("trans") else None
    
    if req_body.get("desc"):
        word_desc = {}
        req_desc = req_body["desc"]
        word_desc["text"] = req_desc.get("text") if req_desc.get("text") else []
        word_desc["ex"] = req_desc.get("ex") if req_desc.get("ex") else []
        word["desc"] = word_desc

    # add
    db["Words"].insert_one(word)

    # return
    return jsonify({"message": "success"})


# delete word
@bp.route("/<id_str>", methods=["DELETE"])
def delete_word(id_str):

    # search for word to delete
    cursor = db["Words"].find({
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
        return jsonify({"message": "no word found with given _id"}), 404

    # delete
    db["Words"].delete_many({
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

