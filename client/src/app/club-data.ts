import { ActivityType } from './strava';

export interface FieldSummary {
  /** Athlete name. */
  name: string;
  /** Totals of that field totalled by activity type. */
  totals: Map<ActivityType, number>;
}
