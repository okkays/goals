import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ElevationSummary } from './club-elevation-data';
import { ActivityType, SummaryActivity } from './strava';
import { athleteNameFromActivity } from './strava-util';
import { StravaService } from './strava.service';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(private readonly stravaService: StravaService) {}

  private getSummary(
    clubActivities: SummaryActivity[]
  ): Observable<ElevationSummary[]> {
    const elevationMap = new Map<string, Map<ActivityType, number>>();
    for (const activity of clubActivities) {
      const athleteName = athleteNameFromActivity(activity);
      let gains = elevationMap.get(athleteName);
      if (!gains) {
        gains = new Map<ActivityType, number>();
        elevationMap.set(athleteName, gains);
      }
      const activityGain = gains.get(activity.type) || 0;
      gains.set(activity.type, activityGain + activity.total_elevation_gain);
    }
    return of(
      Array.from(elevationMap.entries()).map(([athleteName, gains]) => {
        return { name: athleteName.toString(), gains };
      })
    );
  }

  elevationByMember(clubId: number): Observable<ElevationSummary[]> {
    return this.stravaService.getClubActivitiesById(clubId).pipe(
      flatMap((clubActivities) => {
        return this.getSummary(clubActivities);
      })
    );
  }
}
