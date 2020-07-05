import { ActivityType, SummaryActivity } from './strava';
import { PropertyOfType } from './common-util';

export interface FieldSummary {
  /** Athlete name. */
  name: string;
  /** Totals of that field totalled by activity type. */
  totals: Map<ActivityType, number>;
}

export interface SummarizedField {
  fieldKey: PropertyOfType<SummaryActivity, number>;
  scaleLabel: string;
  transformation?: (data: number) => number;
}
