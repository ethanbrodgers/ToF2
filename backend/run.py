from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from services.db import db
from routing import register_all_bp


# load env
load_dotenv()

# init flask
app = Flask(__name__)

# activate CORS
CORS(app)

# setup database connection
app.config["DB"] = db

# register endpoints from blueprints
register_all_bp(app)

if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))