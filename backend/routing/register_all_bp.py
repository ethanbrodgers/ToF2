from .blueprints.vocab import create_vocab_bp
from .blueprints.welcome import create_welcome_bp
from .blueprints.error import create_error_bp

def register_all_bp(app, db):
    """Registers all blueprints to the given app, giving it all endpoints created in the routing package"""
    bps = [
        create_vocab_bp(db),
        create_welcome_bp(),
        create_error_bp()
    ]
    for bp in bps:
        app.register_blueprint(bp)
