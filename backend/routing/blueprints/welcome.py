# welcome.py: defines a blueprint with a quick welcome endpoint used to test that the backend is running

from flask import Blueprint, jsonify

def create_welcome_bp():
    bp = Blueprint("welcome", __name__)

    @bp.route("/", methods=["GET"])
    def welcome():
        return jsonify({"message": "ToF2 backend is running"})
    

    return bp


