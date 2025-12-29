# vocab.py: blueprint for routes related to vocabulary words

from flask import Blueprint, request, jsonify, current_app
import json
import os
from pydantic import ValidationError
from bson import ObjectId
from ..utils import serialize_list
from services import db, call_chatgpt
from validation import LookupPromptWord, LookupChoiceWord

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

# word lookup (AI-assisted)
@bp.route("/lookup", methods=["POST"])
def word_lookup_ai():
    req_body = request.get_json(silent=True)
    if req_body is None:
        return jsonify({"message": "No JSON body provided"}), 400

    # input validation
    try:
        lookup_prompt = LookupPromptWord.model_validate(req_body)
    except ValidationError as exc:
        return jsonify({"message": "Invalid lookup prompt", "details": exc.errors()}), 400

    prompt_word = {}
    if lookup_prompt.word is not None:
        prompt_word = lookup_prompt.word.model_dump(by_alias=True, exclude_none=True)

    if not lookup_prompt.desc and not prompt_word:
        return jsonify({"message": "Lookup prompt must include desc or word fields"}), 400

    prompt_payload = {"desc": lookup_prompt.desc}
    if prompt_word:
        prompt_payload["word"] = prompt_word

    system_prompt = (
        "You are a bilingual lexicography assistant. Output JSON only that matches the LookupChoiceWord schema: "
        "a single JSON object with keys {\"desc\": str, \"word\": Word}. "
        "Word fields: lang (2-letter ISO), en, targ, def, pos, gender, trans, desc, ex. "
        "Allowed pos values: n, p, v, adj, adv, c, i, q. "
        "Gender values: m, f, n, or null for no gender. "
        "Use null for trans when the language already uses the Latin alphabet. "
        "ex must be 1 to 3 example sentences with en, targ, positive. "
        "Preserve any user-provided fields exactly; fill missing fields with best-fit values. "
        "Do not include _id or any extra keys."
    )
    system_prompt_2 = (
        "Provide the single best-fit choice; if the prompt is ambiguous, choose the most common sense and briefly mention alternates in desc. "
        "Keep def brief and use desc for usage notes or clarifications. "
        "Set positive=true for correct examples; only include a negative example if it helps clarify usage."
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "system", "content": system_prompt_2},
        {"role": "user", "content": "Lookup prompt JSON:\n" + json.dumps(prompt_payload, ensure_ascii=True, indent=2)},
    ]

    ai_model = os.getenv("OPENAI_MODEL", "gpt-5-mini")
    try:
        lookup_result = call_chatgpt(ai_model, messages, json_model=LookupChoiceWord)
    except Exception:
        current_app.logger.exception("Lookup AI call failed")
        return jsonify({"message": "Lookup failed"}), 502

    if hasattr(lookup_result, "model_dump"):
        result_payload = lookup_result.model_dump(by_alias=True)
    else:
        result_payload = lookup_result

    return jsonify(result_payload)

# add a word
@bp.route("/", methods=["PUT"])
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
    word["def"] = req_body.get("def", "[none provided]")
    word["gender"] = req_body.get("gender", None)
    word["trans"] = req_body.get("trans", None)
    word["desc"] = req_body.get("desc", "[none provided]")
    word["ex"] = req_body.get("ex", [])

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
