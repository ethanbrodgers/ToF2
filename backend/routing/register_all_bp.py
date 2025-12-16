from .blueprints.vocab import bp as vocab_bp
from .blueprints.welcome import bp as welcome_bp
from .blueprints.error import bp as error_bp

def register_all_bp(app):
    """Registers all blueprints to the given Flask app, giving it all endpoints created in the routing package"""
    bps = [
        vocab_bp,
        welcome_bp,
        error_bp
    ]
    for bp in bps:
        app.register_blueprint(bp)
