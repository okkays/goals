import { ActivityType } from './strava';

export interface ElevationSummary {
  /** Athlete name. */
  name: string;
  /** Total elevation in meters by activity type */
  gains: Map<ActivityType, number>;
}
