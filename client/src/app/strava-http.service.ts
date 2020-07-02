import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SummaryActivity, SummaryAthlete } from './strava';
import { Observable } from 'rxjs';
import { FlaskService } from './flask.service';
import {
  pluck,
  map,
  shareReplay,
  flatMap,
  catchError,
  retryWhen,
  delay,
  take,
} from 'rxjs/operators';

export const ROOT = 'http://localhost:5000/strava';
export const PROXY = `${ROOT}/proxy`;

function toParams(options?: Record<string, unknown | unknown[]>) {
  if (!options) {
    return new HttpParams();
  }
  return Object.entries(options).reduce(
    (httpParams: HttpParams, [key, value]) => {
      if (Array.isArray(value)) {
        for (const subValue of value) {
          httpParams = httpParams.append(key, subValue);
        }
        return httpParams;
      }
      return httpParams.set(key, String(value));
    },
    new HttpParams()
  );
}

@Injectable({
  providedIn: 'root',
})
export class StravaHttpService extends StravaService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getClubActivitiesById(
    id: number,
    options?: { page?: number; per_page?: number }
  ): Observable<SummaryActivity[]> {
    const params = toParams(options);
    return this.httpClient.get<SummaryActivity[]>(
      `${PROXY}/clubs/${id}/activities`,
      {
        params,
      }
    );
  }
}
