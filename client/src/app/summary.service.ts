import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { FieldSummary } from './field-data';
import { ActivityType, SummaryActivity } from './strava';
import { athleteNameFromActivity } from './strava-util';
import { StravaService } from './strava.service';
import { PropertyOfType } from './common-util';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  constructor(private readonly stravaService: StravaService) {}

  private getSummary(
    clubActivities: SummaryActivity[],
    field: PropertyOfType<SummaryActivity, number>
  ): Observable<FieldSummary[]> {
    const fieldMap = new Map<string, Map<ActivityType, number>>();
    for (const activity of clubActivities) {
      const athleteName = athleteNameFromActivity(activity);
      let activityTotals = fieldMap.get(athleteName);
      if (!activityTotals) {
        activityTotals = new Map<ActivityType, number>();
        fieldMap.set(athleteName, activityTotals);
      }
      const activityTotal = activityTotals.get(activity.type) || 0;
      activityTotals.set(activity.type, activityTotal + activity[field]);
    }
    return of(
      Array.from(fieldMap.entries()).map(([athleteName, totals]) => {
        return { name: athleteName.toString(), totals };
      })
    );
  }

  fieldByMember(
    clubId: number,
    field: PropertyOfType<SummaryActivity, number>
  ): Observable<FieldSummary[]> {
    return this.stravaService.getClubActivitiesById(clubId).pipe(
      flatMap((clubActivities) => {
        return this.getSummary(clubActivities, field);
      })
    );
  }
}
