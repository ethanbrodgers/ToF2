# load env
from dotenv import load_dotenv
load_dotenv()

# imports
from flask import Flask
from flask_cors import CORS
import os
from routing import register_all_bp



# init flask
app = Flask(__name__)

# activate CORS
CORS(app)

# register endpoints from blueprints
register_all_bp(app)

# run
if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("PORT", 5000)))