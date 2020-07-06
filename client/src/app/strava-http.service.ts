import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROXY, toParams } from './api-util';
import { SummaryActivity } from './strava';
import { StravaService } from './strava.service';

@Injectable({
  providedIn: 'root',
})
export class StravaHttpService extends StravaService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  getClubActivitiesById(
    id: number,
    query?: {
      /** The page to find. */
      page?: number;
      /** The number per page to find. */
      per_page?: number;
    }
  ): Observable<SummaryActivity[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryActivity[]>(
      `${PROXY}/clubs/${id}/activities`,
      {
        params,
      }
    );
  }
}
