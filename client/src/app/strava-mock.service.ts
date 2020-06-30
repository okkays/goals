import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SummaryActivity } from './strava';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StravaMockService extends StravaService {
  constructor() {
    super();
  }

  getClubActivitiesById(
    id: number,
    options?: { page?: number; per_page?: number }
  ): Observable<SummaryActivity[]> {
    return of([
      { athlete: { id: 1 }, total_elevation_gain: 24 } as SummaryActivity,
      { athlete: { id: 1 }, total_elevation_gain: 51 } as SummaryActivity,
      { athlete: { id: 2 }, total_elevation_gain: 300 } as SummaryActivity,
      { athlete: { id: 3 }, total_elevation_gain: 153 } as SummaryActivity,
    ]);
  }
}
