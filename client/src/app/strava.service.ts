import { SummaryActivity } from './strava';
import { Observable } from 'rxjs';

export abstract class StravaService {
  abstract getClubActivitiesById(
    id: number,
    options?: { page: number; per_page: number }
  ): Observable<SummaryActivity[]>;
}
