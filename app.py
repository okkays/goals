import flask
import requests
from dotenv import load_dotenv
import os

STRAVA_CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
STRAVA_CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')

load_dotenv()

app = flask.Flask(__name__)


@app.route("/")
def hello():
  return 'hi'


@app.route("/login")
def login():
  redirect_uri = 'http://localhost:5000/oauth2/strava'
  scope = 'activity:read'
  return flask.redirect('https://www.strava.com/oauth/authorize?' +
                 f'client_id={STRAVA_CLIENT_ID}' +
                 f'&redirect_uri={redirect_uri}' +
                 f'&response_type=code&scope={scope}')


@app.route("/oauth2/strava")
def oauth2_strava():
  error = flask.request.args.get('error')
  if error:
    flask.abort(502, error)
  code = flask.request.args.get('code')
  scope = flask.request.args.get('scope')
  secret_response = requests.post('https://www.strava.com/oauth/token',
                         {
                             'client_id': STRAVA_CLIENT_ID,
                             'client_secret': STRAVA_CLIENT_SECRET,
                             'code': code,
                             'grant_type': 'authorization_code',
                         })
  return flask.jsonify(secret_response.json())
