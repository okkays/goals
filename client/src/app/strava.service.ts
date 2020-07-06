import { SummaryActivity } from './strava';
import { Observable } from 'rxjs';

export abstract class StravaService {
  abstract getClubActivitiesById(
    id: number,
    query?: {
      /** Page. */
      page?: number;
      /** Page. */
      per_page?: number;
    }
  ): Observable<SummaryActivity[]>;
}
