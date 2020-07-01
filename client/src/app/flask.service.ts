import { Injectable } from '@angular/core';

const ROOT = 'localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class FlaskService {
  constructor(readonly httpClient: HttpClient) {}

  getToken() {
    const cookie = document.cookie
      .split(';')
      .find((c) => c.startsWith('token='));
    if (!cookie) return undefined;
    return c.split('=')[1];
  }

  login() {
    this.httpClient.post();
    window.open(`${ROOT}/login`);
  }
}
