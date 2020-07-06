import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { SummaryActivity } from './strava';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StravaMockService extends StravaService {
  getClubActivitiesById(
    id: number,
    query?: { page?: number; per_page?: number }
  ): Observable<SummaryActivity[]> {
    return of([
      {
        athlete: {
          lastname: 'Hollinger',
          firstname: 'Coach',
          resource_state: 2,
        },
        total_elevation_gain: 24,
      } as SummaryActivity,
      {
        athlete: {
          lastname: 'Hamilton',
          firstname: 'Colby',
          resource_state: 2,
        },
        total_elevation_gain: 51,
      } as SummaryActivity,
      {
        athlete: { lastname: 'Linden', firstname: 'Alex', resource_state: 2 },
        total_elevation_gain: 300,
      } as SummaryActivity,
      {
        athlete: { lastname: 'Kays', firstname: 'Kevin', resource_state: 2 },
        total_elevation_gain: 153,
      } as SummaryActivity,
    ]);
  }
}
