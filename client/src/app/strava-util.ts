import { SummaryActivity } from './strava';

export function athleteNameFromActivity(activity: SummaryActivity): string {
  return `${activity.athlete.firstname} ${activity.athlete.lastname}`;
}
