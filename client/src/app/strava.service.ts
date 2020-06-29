import { SummaryActivity } from './strava';

export abstract class StravaService {
  abstract getClubActivitiesById(
    id: number,
    options: { page: number; per_page: number }
  ): SummaryActivity;
}
