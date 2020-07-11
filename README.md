Deploys to [Heroku](https://raybeam-goals.herokuapp.com/club/214176) on master push.

Shows graphs of Strava data.

Uses a flask server that handles auth and acts as a proxy to make API calls.

To get started:

- Follow instructions in example.env
- Optionally modify environment.ts

To run in development mode:

- Set FLASK_ENV to development in .env
- `python -m flask run`
- `ng serve`
- navigate to http://localhost:5000 (or whatever your flask instance is)

To run in production mode:

- Set FLASK_ENV to production in .env
- `ng build --prod`
- `gunicorn app:app`
- navigate to http://localhost:5000 (or whatever your flask instance is)
