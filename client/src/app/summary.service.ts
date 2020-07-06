import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, EMPTY } from 'rxjs';
import { flatMap, map, expand } from 'rxjs/operators';
import { FieldSummary } from './field-data';
import { ActivityType, SummaryActivity } from './strava';
import { athleteNameFromActivity } from './strava-util';
import { StravaService } from './strava.service';
import { PropertyOfType } from './common-util';
import * as moment from 'moment';

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

  getClubActivitiesSince(
    clubId: bigint,
    after: moment.Moment,
    page: number = 1
  ): Observable<SummaryActivity[]> {
    return this.stravaService.getClubActivitiesById(clubId, {
      after: after.unix(),
      page,
      per_page: 200,
    });
  }

  fieldByMember(
    clubId: bigint,
    field: PropertyOfType<SummaryActivity, number>,
    after: moment.Moment
  ): Observable<FieldSummary[]> {
    return this.getClubActivitiesSince(clubId, after).pipe(
      flatMap((clubActivities) => {
        return this.getSummary(clubActivities, field);
      })
    );
  }
}
