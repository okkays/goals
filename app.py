import os

import flask
import flask_cors
from dotenv import load_dotenv

import strava

load_dotenv()

app = flask.Flask(__name__,
                  static_folder='dist/client', static_url_path='/v1/')
app.register_blueprint(strava.blueprint)

if app.config['DEBUG']:
  app.config['API_URL'] = os.getenv('DEBUG_API_URL') or 'http://localhost:5000'
  app.config['ORIGIN'] = os.getenv('DEBUG_ORIGIN') or 'http://localhost:4200'

  flask_cors.CORS(app,
                  allow_headers='*',
                  origins=[app.config['ORIGIN']],
                  supports_credentials=True)
else:
  app.config['API_URL'] = os.getenv('PROD_API_URL')

# Set the secret key to enable session.
app.secret_key = os.urandom(24)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_angular(path):
  if flask.current_app.config['DEBUG']:
    target = '/'.join([
      flask.current_app.config['ORIGIN'].rstrip('/'),
      path.lstrip('/')
    ])
    return flask.redirect(target)
  return flask.send_from_directory('dist/client', path)

@app.errorhandler(404)
def serve_angular_routing(error):
  del error
  return flask.send_file('dist/client/index.html')
