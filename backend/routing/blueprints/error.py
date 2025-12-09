# error.py: blueprint for error handling

from flask import Blueprint, jsonify

def create_error_bp():
    bp = Blueprint("error", __name__)

    @bp.app_errorhandler(404)
    def error404(e):
        return jsonify({"error": "404 not found"})
    
    @bp.app_errorhandler(500)
    def error500(e):
        return jsonify({"error": "500 internal server error"})
    
    return bp

