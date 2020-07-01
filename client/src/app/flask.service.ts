import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs';
import { catchError, delay, retryWhen, take } from 'rxjs/operators';
import { AuthResult } from './strava';

const ROOT = 'http://localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class FlaskService {
  constructor(readonly httpClient: HttpClient) {}

  makeToken(): string {
    return _.times(256, () => _.random(35).toString(36)).join('');
  }

  getToken(): string {
    const cookie = document.cookie
      .split(';')
      .find((c) => c.startsWith('token='));
    if (!cookie) {
      const token = this.makeToken();
      document.cookie = `token=${token}`;
      return token;
    }
    return cookie.split('=')[1];
  }

  getSecret(): Observable<AuthResult> {
    const token = this.getToken();
    return this.httpClient
      .post<AuthResult>(`${ROOT}/secret`, { token }, { withCredentials: true })
      .pipe(
        catchError((err) => {
          console.error(err);
          window.open(`${ROOT}/login?token=${token}`);
          return this.pollSecret(token);
        })
      );
  }

  private pollSecret(token: string): Observable<AuthResult> {
    return this.httpClient
      .post<AuthResult>(`${ROOT}/secret`, { token }, { withCredentials: true })
      .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(600))));
  }
}
