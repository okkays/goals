import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
import { ClubElevationData, ElevationSummary } from './club-elevation-data';
import { Observable, of } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { SummaryActivity, ActivityType } from './strava';
import {
  athleteNameFromActivity,
  ActivityFilters,
  filterActivities,
} from './strava-util';

@Injectable({
  providedIn: 'root',
})
export class ElevationService {
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
