import flask
import requests
from dotenv import load_dotenv
import os
import time
import urllib

STRAVA_CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
STRAVA_CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')

load_dotenv()

app = flask.Flask(__name__)

# Set the secret key to enable session.
app.secret_key = os.urandom(24)


@app.route("/")
def hello():
  return 'hi'


you_may_close = """
<script>
window.close()
</script>
You may now close this window.
"""

@app.route("/login", methods=['GET'])
def login():
  token = flask.request.args.get('token')
  if not token:
    flask.abort(400, 'Must specify a token')
  existing = flask.session.get('secret')
  if not existing or not existing.get('access_token'):
    return new_login(token)
  if existing.get('expires_at', 0) < time.time():
    return refresh_token(existing)
  return you_may_close


@app.route("/secret", methods=["POST"])
def secret():
  if not flask.request.json:
    flask.abort(400, 'Must specify a token')
  token = flask.request.json.get('token')
  if not token:
    flask.abort(400, 'Must specify a token')
  saved_token = flask.session.get('token')
  if not saved_token:
    flask.abort(401, 'Please log in first')
  if token != saved_token:
    flask.abort(403, 'Incorrect token')
  return flask.jsonify(flask.session.get('secret'))


def refresh_token(old_secret):
  secret = requests.post('https://www.strava.com/oauth/token',
                         {
                           'client_id': STRAVA_CLIENT_ID,
                           'client_secret': STRAVA_CLIENT_SECRET,
                           'grant_type': 'refresh_token',
                           'refresh_token': old_secret.get('refresh_token'),
                         })
  if 'errors' in secret:
    flask.abort(400, secret.get('message', 'Unknown Error'))
  flask.session['secret'] = secret
  return you_may_close


def new_login(token):
  redirect_uri = 'http://localhost:5000/oauth2/strava'
  scope = 'activity:read'
  return flask.redirect('https://www.strava.com/oauth/authorize?' +
                        f'client_id={STRAVA_CLIENT_ID}' +
                        f'&redirect_uri={redirect_uri}' +
                        f'&response_type=code' +
                        f'&scope={scope}' +
                        f'&state={urllib.parse.quote_plus(token)}')


@app.route("/oauth2/strava")
def oauth2_strava():
  error = flask.request.args.get('error')
  if error:
    flask.abort(502, error)
  state = flask.request.args.get('state', '')
  code = flask.request.args.get('code')
  scope = flask.request.args.get('scope')
  secret = requests.post('https://www.strava.com/oauth/token',
                         {
                             'client_id': STRAVA_CLIENT_ID,
                             'client_secret': STRAVA_CLIENT_SECRET,
                             'code': code,
                             'grant_type': 'authorization_code',
                         }).json()
  if 'errors' in secret:
    flask.abort(400, secret.get('message', 'Unknown Error'))
  flask.session['secret'] = secret
  return you_may_close
