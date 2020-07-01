import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { SummaryActivity } from './strava';
import { Observable } from 'rxjs';
import { FlaskService } from './flask.service';
import { pluck, map, shareReplay, flatMap } from 'rxjs/operators';

const API = 'https://www.strava.com/api/v3';

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
  constructor(
    private readonly httpClient: HttpClient,
    private readonly flaskService: FlaskService
  ) {
    super();
  }

  private getAccessHeader(): Observable<HttpHeaders> {
    return this.flaskService.getSecret().pipe(
      pluck('access_token'),
      map((token) => new HttpHeaders({ access_token: token })),
      shareReplay(1)
    );
  }

  getClubActivitiesById(
    id: number,
    options?: { page?: number; per_page?: number }
  ): Observable<SummaryActivity[]> {
    const params = toParams(options);
    return this.getAccessHeader().pipe(
      flatMap((headers) => {
        return this.httpClient.get<SummaryActivity[]>(
          `${API}/clubs/${id}/activities`,
          {
            params,
            headers,
          }
        );
      })
    );
  }
}
