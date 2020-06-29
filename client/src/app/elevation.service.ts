import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { ClubElevationData, ElevationSummary } from './club-elevation-data';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { SummaryActivity } from './strava';

@Injectable({
  providedIn: 'root',
})
export class ElevationService {
  constructor(private readonly stravaService: StravaService) {}

  private getSummary(
    clubActivities: SummaryActivity[]
  ): Observable<ElevationSummary[]> {
    const elevationMap = new Map<number, number>();
    for (const activity of clubActivities) {
      elevationMap.set(activity.athlete.id, activity.total_elevation_gain);
    }
    return of(
      Array.from(elevationMap.entries()).map((athleteId, elevation) => {
        return { name: athleteId.toString(), elevation };
      })
    );
  }

  elevationByMember(clubId: number): Observable<ClubElevationData> {
    return this.stravaService.getClubActivitiesById(clubId).pipe(
      flatMap((clubActivities) => {
        return this.getSummary(clubActivities);
      }),
      map((summary) => {
        return { summary };
      })
    );
  }
}
