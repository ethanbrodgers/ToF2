from .blueprints.vocab import bp as vocab_bp
from .blueprints.grammar import bp as grammar_bp
from .blueprints.style import bp as style_bp
from .blueprints.welcome import bp as welcome_bp
from .blueprints.error import bp as error_bp

def register_all_bp(app):
    """Registers all blueprints to the given Flask app, giving it all endpoints created in the routing package"""
    bps = [
        (vocab_bp, "/vocab"),
        (welcome_bp, "/welcome"),
        (error_bp, "/error"),
        (grammar_bp, "/grammar"),
        (style_bp, "/style"),
    ]
    for bp, prefix in bps:
        app.register_blueprint(bp, url_prefix=prefix)
