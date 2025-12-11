# load env
from dotenv import load_dotenv
load_dotenv()

# imports
from flask import Flask
from flask_cors import CORS
import os
from routing import register_all_bp
from services.db import db



# init flask
app = Flask(__name__)

# activate CORS
CORS(app)

# attach database to flask app for use in endpoints
app.config["DB"] = db

# register endpoints from blueprints
register_all_bp(app)

# run
if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))