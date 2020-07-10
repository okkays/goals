import { SummaryActivity, ActivityType } from './strava';
import { MetaAthlete } from './strava-override';

export function athleteNameFromActivity(activity: SummaryActivity): string {
  const athlete = (activity.athlete as unknown) as MetaAthlete;
  return `${athlete.firstname} ${athlete.lastname}`;
}

export declare interface ActivityFilters {
  includeRide?: boolean;
  includeRun?: boolean;
}

export function isRun(activityType: ActivityType) {
  return activityType === 'Run' || activityType === 'VirtualRun';
}

export function isRide(activityType: ActivityType) {
  return (
    activityType === 'Ride' ||
    activityType === 'VirtualRide' ||
    activityType === 'EBikeRide'
  );
}

export function filterActivities(
  activities: SummaryActivity[],
  filters: ActivityFilters
): SummaryActivity[] {
  return activities.filter((activity) => {
    if (filters.includeRun && isRun(activity.type)) {
      return true;
    }
    if (filters.includeRide && isRide(activity.type)) {
      return true;
    }
    return false;
  });
}
