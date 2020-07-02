import os
import time

import flask
import logging
import requests

blueprint = flask.Blueprint('strava', __name__, url_prefix="/strava")

STRAVA_CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
STRAVA_CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')
HOSTNAME = os.getenv("HOSTNAME")
API = 'https://www.strava.com/api/v3';

you_may_close = """
<script>
window.close()
</script>
You may now close this window.
"""


def get_secret():
  secret = flask.session.get('secret')
  if not secret:
    flask.abort(401, 'Please log in first')
  if secret.get('expires_at', 0) < time.time():
    flask.abort(401, 'Authentication expired, please re-login')
  return secret


@blueprint.route("/proxy/<path:path>")
def proxy(path):
  method = flask.request.method
  secret = get_secret()
  token = secret.get('access_token')
  request_params = {
    'headers': {'Authorization': f'Bearer {token}'}
  }
  if flask.request.json:
    request_params['json'] = flask.request.json
  if flask.request.form:
    request_params['form'] = flask.request.form
  if flask.request.args:
    request_params['args'] = flask.request.args
  clean_path = path.lstrip('/')
  url = f'{API}/{clean_path}'
  logging.info('Strava: requesting %s', url)
  proxy_response = requests.request(
    method, url, **request_params)
  try:
    json = proxy_response.json()
  except ValueError:
    text = proxy_response.text
    flask.abort(502, f'Unexpected non-json response: {text}')
  return flask.jsonify(json), proxy_response.status_code

@blueprint.route("/login", methods=['GET'])
def login():
  existing = flask.session.get('secret')
  if not existing or not existing.get('access_token'):
    return new_login()
  if existing.get('expires_at', 0) < time.time():
    return refresh_token(existing)
  return you_may_close


@blueprint.route("/user", methods=['GET'])
def user():
  secret = get_secret()
  user = secret.get('athlete')
  if not user:
    flask.abort(502, 'No user data associated with secret')
  return flask.jsonify(user)


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


def new_login():
  redirect_uri = f'{HOSTNAME}/strava/oauth2_callback'
  scope = 'activity:read'
  return flask.redirect('https://www.strava.com/oauth/authorize?' +
                        f'client_id={STRAVA_CLIENT_ID}' +
                        f'&redirect_uri={redirect_uri}' +
                        f'&response_type=code' +
                        f'&scope={scope}')


@blueprint.route("/oauth2_callback")
def oauth2_callback():
  error = flask.request.args.get('error')
  if error:
    flask.abort(502, error)
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
