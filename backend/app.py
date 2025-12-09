# app.py: app initialization

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os
from routes import bp # blueprint

# load env
load_dotenv()

# init flask
app = Flask(__name__)

# activate CORS
CORS(app)

# register endpoints from blueprint
app.register_blueprint(bp)

# run
if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))




