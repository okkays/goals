import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { ClubElevationData, ElevationSummary } from './club-elevation-data';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { SummaryActivity } from './strava';
import { athleteNameFromActivity } from './strava-util';

@Injectable({
  providedIn: 'root',
})
export class ElevationService {
  constructor(private readonly stravaService: StravaService) {}

  private getSummary(
    clubActivities: SummaryActivity[]
  ): Observable<ElevationSummary[]> {
    const elevationMap = new Map<string, number>();
    for (const activity of clubActivities) {
      const athleteName = athleteNameFromActivity(activity);
      const gain = elevationMap.get(athleteName) || 0;
      elevationMap.set(athleteName, gain + activity.total_elevation_gain);
    }
    return of(
      Array.from(elevationMap.entries()).map(([athleteName, elevation]) => {
        return { name: athleteName.toString(), elevation };
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
