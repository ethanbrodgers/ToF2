from .blueprints.vocab import create_vocab_bp
from .blueprints.welcome import create_welcome_bp

def register_all_bp(app, db):
    """Registers all blueprints to the given app, giving it all endpoints created in the routing package"""
    app.register_blueprint(create_vocab_bp(db))
    app.register_blueprint(create_welcome_bp())
