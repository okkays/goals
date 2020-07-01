import { Injectable } from '@angular/core';

const ROOT = 'localhost:5000';

@Injectable({
  providedIn: 'root',
})
export class FlaskService {
  constructor(readonly httpClient: HttpClient) {}

  login() {
    this.httpClient.get(`${ROOT}/login`);
  }
}
