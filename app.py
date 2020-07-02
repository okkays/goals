import os

import flask
import flask_cors
from dotenv import load_dotenv

import strava

load_dotenv()

app = flask.Flask(__name__)
app.register_blueprint(strava.blueprint)

flask_cors.CORS(app,
                allow_headers='*',
                origins=['http://localhost:4200'],
                supports_credentials=True)

# Set the secret key to enable session.
app.secret_key = os.urandom(24)


@app.route("/")
def hello():
  return 'Status OK'
