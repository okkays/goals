/** Contains the HTTP Service for Strava API. */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROXY, toParams } from './api-util';
import {
  ActivityStats,
  ActivityTotal,
  ActivityType,
  ActivityZone,
  BaseStream,
  Comment,
  Error,
  ExplorerResponse,
  ExplorerSegment,
  Fault,
  HeartRateZoneRanges,
  Lap,
  LatLng,
  MetaActivity,
  MetaAthlete,
  MetaClub,
  PhotosSummary,
  PhotosSummary_primary,
  PolylineMap,
  PowerZoneRanges,
  Route,
  RunningRace,
  Split,
  StreamSet,
  SummaryGear,
  SummaryPRSegmentEffort,
  SummarySegment,
  SummarySegmentEffort,
  TimedZoneDistribution,
  UpdatableActivity,
  Upload,
  ZoneRange,
  ZoneRanges,
  Zones,
  AltitudeStream,
  CadenceStream,
  DetailedGear,
  DetailedSegment,
  DetailedSegmentEffort,
  DistanceStream,
  HeartrateStream,
  LatLngStream,
  MovingStream,
  PowerStream,
  SmoothGradeStream,
  SmoothVelocityStream,
  SummaryActivity,
  SummaryAthlete,
  SummaryClub,
  TemperatureStream,
  TimeStream,
  TimedZoneRange,
  DetailedActivity,
  DetailedAthlete,
  DetailedClub,
} from './strava';
import { StravaService } from './strava.service';

/** HTTP Service for Strava API. */
@Injectable({ providedIn: 'root' })
export class StravaHttpService extends StravaService {
  constructor(private readonly httpClient: HttpClient) {
    super();
  }

  createActivity(): Observable<DetailedActivity> {
    return this.httpClient.post<DetailedActivity>(`${PROXY}/activities`, {});
  }

  getActivityById(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** To include all segments efforts. */
      include_all_efforts?: boolean;
    }
  ): Observable<DetailedActivity> {
    const params = toParams(query);
    return this.httpClient.get<DetailedActivity>(`${PROXY}/activities/${id}`, {
      params,
    });
  }

  getCommentsByActivityId(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<Comment[]> {
    const params = toParams(query);
    return this.httpClient.get<Comment[]>(
      `${PROXY}/activities/${id}/comments`,
      {
        params,
      }
    );
  }

  getKudoersByActivityId(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryAthlete[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryAthlete[]>(
      `${PROXY}/activities/${id}/kudos`,
      {
        params,
      }
    );
  }

  getLapsByActivityId(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<Lap[]> {
    return this.httpClient.get<Lap[]>(`${PROXY}/activities/${id}/laps`, {});
  }

  getLoggedInAthleteActivities(query?: {
    /** An epoch timestamp to use for filtering activities that have taken place before a certain time. */
    before?: number;
    /** An epoch timestamp to use for filtering activities that have taken place after a certain time. */
    after?: number;
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummaryActivity[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryActivity[]>(
      `${PROXY}/athlete/activities`,
      {
        params,
      }
    );
  }

  getZonesByActivityId(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<ActivityZone[]> {
    return this.httpClient.get<ActivityZone[]>(
      `${PROXY}/activities/${id}/zones`,
      {}
    );
  }

  updateActivityById(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<DetailedActivity> {
    return this.httpClient.put<DetailedActivity>(
      `${PROXY}/activities/${id}`,
      {}
    );
  }

  getLoggedInAthlete(): Observable<DetailedAthlete> {
    return this.httpClient.get<DetailedAthlete>(`${PROXY}/athlete`, {});
  }

  getLoggedInAthleteZones(): Observable<Zones> {
    return this.httpClient.get<Zones>(`${PROXY}/athlete/zones`, {});
  }

  getStats(
    /** The identifier of the athlete. Must match the authenticated athlete. */
    id: bigint
  ): Observable<ActivityStats> {
    return this.httpClient.get<ActivityStats>(
      `${PROXY}/athletes/${id}/stats`,
      {}
    );
  }

  updateLoggedInAthlete(
    /** The weight of the athlete in kilograms. */
    weight: number
  ): Observable<DetailedAthlete> {
    return this.httpClient.put<DetailedAthlete>(`${PROXY}/athlete`, {});
  }

  getClubActivitiesById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Epoch in seconds. Only specify one of before or after. */
      before?: number;
      /** Epoch in seconds. Only specify one of before or after. */
      after?: number;
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryActivity[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryActivity[]>(
      `${PROXY}/clubs/${id}/activities`,
      {
        params,
      }
    );
  }

  getClubAdminsById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryAthlete[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryAthlete[]>(
      `${PROXY}/clubs/${id}/admins`,
      {
        params,
      }
    );
  }

  getClubById(
    /** The identifier of the club. */
    id: bigint
  ): Observable<DetailedClub> {
    return this.httpClient.get<DetailedClub>(`${PROXY}/clubs/${id}`, {});
  }

  getClubMembersById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryAthlete[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryAthlete[]>(
      `${PROXY}/clubs/${id}/members`,
      {
        params,
      }
    );
  }

  getLoggedInAthleteClubs(query?: {
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummaryClub[]> {
    const params = toParams(query);
    return this.httpClient.get<SummaryClub[]>(`${PROXY}/athlete/clubs`, {
      params,
    });
  }

  getGearById(
    /** The identifier of the gear. */
    id: string
  ): Observable<DetailedGear> {
    return this.httpClient.get<DetailedGear>(`${PROXY}/gear/${id}`, {});
  }

  getRouteAsGPX(
    /** The identifier of the route. */
    id: bigint
  ): Observable<unknown> {
    return this.httpClient.get<unknown>(`${PROXY}/routes/${id}/export_gpx`, {});
  }

  getRoutesByAthleteId(
    /** The identifier of the athlete. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<Route[]> {
    const params = toParams(query);
    return this.httpClient.get<Route[]>(`${PROXY}/athletes/${id}/routes`, {
      params,
    });
  }

  getRunningRaceById(
    /** The identifier of the running race. */
    id: bigint
  ): Observable<RunningRace> {
    return this.httpClient.get<RunningRace>(`${PROXY}/running_races/${id}`, {});
  }

  getRunningRaces(query?: {
    /** Filters the list by a given year. */
    year?: number;
  }): Observable<RunningRace[]> {
    const params = toParams(query);
    return this.httpClient.get<RunningRace[]>(`${PROXY}/running_races`, {
      params,
    });
  }

  getEffortsBySegmentId(query: {
    /** The identifier of the segment. */
    segment_id: number;
    /** ISO 8601 formatted date time. */
    start_date_local?: string;
    /** ISO 8601 formatted date time. */
    end_date_local?: string;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<DetailedSegmentEffort[]> {
    const params = toParams(query);
    return this.httpClient.get<DetailedSegmentEffort[]>(
      `${PROXY}/segment_efforts`,
      {
        params,
      }
    );
  }

  getSegmentEffortById(
    /** The identifier of the segment effort. */
    id: bigint
  ): Observable<DetailedSegmentEffort> {
    return this.httpClient.get<DetailedSegmentEffort>(
      `${PROXY}/segment_efforts/${id}`,
      {}
    );
  }

  exploreSegments(query: {
    /** The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude] */
    bounds: number[];
    /** Desired activity type. May take one of the following values: running, riding */
    activity_type?: string;
    /** The minimum climbing category. */
    min_cat?: number;
    /** The maximum climbing category. */
    max_cat?: number;
  }): Observable<ExplorerResponse> {
    const params = toParams(query);
    return this.httpClient.get<ExplorerResponse>(`${PROXY}/segments/explore`, {
      params,
    });
  }

  getLoggedInAthleteStarredSegments(query?: {
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummarySegment[]> {
    const params = toParams(query);
    return this.httpClient.get<SummarySegment[]>(`${PROXY}/segments/starred`, {
      params,
    });
  }

  getSegmentById(
    /** The identifier of the segment. */
    id: bigint
  ): Observable<DetailedSegment> {
    return this.httpClient.get<DetailedSegment>(`${PROXY}/segments/${id}`, {});
  }

  starSegment(
    /** The identifier of the segment to star. */
    id: bigint
  ): Observable<DetailedSegment> {
    return this.httpClient.put<DetailedSegment>(
      `${PROXY}/segments/${id}/starred`,
      {}
    );
  }

  getActivityStreams(
    /** The identifier of the activity. */
    id: bigint,
    query: {
      /** Desired stream types. May take one of the following values: */
      keys: string[];
      /** Must be true. */
      key_by_type: boolean;
    }
  ): Observable<StreamSet> {
    const params = toParams(query);
    return this.httpClient.get<StreamSet>(`${PROXY}/activities/${id}/streams`, {
      params,
    });
  }

  getRouteStreams(
    /** The identifier of the route. */
    id: bigint
  ): Observable<StreamSet> {
    return this.httpClient.get<StreamSet>(`${PROXY}/routes/${id}/streams`, {});
  }

  getSegmentEffortStreams(
    /** The identifier of the segment effort. */
    id: bigint,
    query: {
      /** The types of streams to return. May take one of the following values: */
      keys: string[];
      /** Must be true. */
      key_by_type: boolean;
    }
  ): Observable<StreamSet> {
    const params = toParams(query);
    return this.httpClient.get<StreamSet>(
      `${PROXY}/segment_efforts/${id}/streams`,
      {
        params,
      }
    );
  }

  getSegmentStreams(
    /** The identifier of the segment. */
    id: bigint,
    query: {
      /** The types of streams to return. May take one of the following values: */
      keys: string[];
      /** Must be true. */
      key_by_type: boolean;
    }
  ): Observable<StreamSet> {
    const params = toParams(query);
    return this.httpClient.get<StreamSet>(`${PROXY}/segments/${id}/streams`, {
      params,
    });
  }

  createUpload(): Observable<Upload> {
    return this.httpClient.post<Upload>(`${PROXY}/uploads`, {});
  }

  getUploadById(
    /** The identifier of the upload. */
    uploadId: bigint
  ): Observable<Upload> {
    return this.httpClient.get<Upload>(`${PROXY}/uploads/${uploadId}`, {});
  }
}
