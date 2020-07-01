import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SummaryActivity } from './strava';
import { Observable } from 'rxjs';

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
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getClubActivitiesById(
    id: number,
    options?: { page?: number; per_page?: number }
  ): Observable<SummaryActivity[]> {
    const params = toParams(options);
    return this.httpClient.get<SummaryActivity[]>(
      `${API}/clubs/${id}/activities`,
      {
        params,
      }
    );
  }
}
