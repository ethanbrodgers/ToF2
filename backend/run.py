from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from services.db import db
# blueprints
from routing.register_all_bp import register_all_bp

# load env
load_dotenv()

# init flask
app = Flask(__name__)

# activate CORS
CORS(app)

# register endpoints from blueprint
register_all_bp(app, db)

if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))