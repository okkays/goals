import os

import flask
import flask_cors
from dotenv import load_dotenv

import strava

load_dotenv()

app = flask.Flask(__name__)
app.register_blueprint(strava.blueprint)

if app.config['DEBUG']:
  app.config['API_URL'] = os.getenv('DEBUG_API_URL') or 'http://localhost:5000'
  origin = os.getenv('DEBUG_ORIGIN') or 'http://localhost:4200'

  flask_cors.CORS(app,
                  allow_headers='*',
                  origins=[origin],
                  supports_credentials=True)
else:
  app.config['API_URL'] = os.getenv('PROD_API_URL')

# Set the secret key to enable session.
app.secret_key = os.urandom(24)


@app.route("/")
def hello():
  return 'Status OK'
