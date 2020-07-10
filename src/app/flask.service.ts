import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'underscore';
import { Observable } from 'rxjs';
import { catchError, delay, retryWhen, take } from 'rxjs/operators';
import { SummaryAthlete } from './strava';

@Injectable({
  providedIn: 'root',
})
export class FlaskService {
  constructor(readonly httpClient: HttpClient) {}
}
