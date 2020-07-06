/** Contains the abstract Service for Strava API. */
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
import { Observable } from 'rxjs';

/** Abstract Service for Strava API. */
export abstract class StravaService {
  abstract createActivity(): Observable<DetailedActivity>;

  abstract getActivityById(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** To include all segments efforts. */
      include_all_efforts?: boolean;
    }
  ): Observable<DetailedActivity>;

  abstract getCommentsByActivityId(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<Comment[]>;

  abstract getKudoersByActivityId(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryAthlete[]>;

  abstract getLapsByActivityId(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<Lap[]>;

  abstract getLoggedInAthleteActivities(query?: {
    /** An epoch timestamp to use for filtering activities that have taken place before a certain time. */
    before?: number;
    /** An epoch timestamp to use for filtering activities that have taken place after a certain time. */
    after?: number;
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummaryActivity[]>;

  abstract getZonesByActivityId(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<ActivityZone[]>;

  abstract updateActivityById(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<DetailedActivity>;

  abstract getLoggedInAthlete(): Observable<DetailedAthlete>;

  abstract getLoggedInAthleteZones(): Observable<Zones>;

  abstract getStats(
    /** The identifier of the athlete. Must match the authenticated athlete. */
    id: bigint
  ): Observable<ActivityStats>;

  abstract updateLoggedInAthlete(
    /** The weight of the athlete in kilograms. */
    weight: number
  ): Observable<DetailedAthlete>;

  abstract getClubActivitiesById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryActivity[]>;

  abstract getClubAdminsById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryAthlete[]>;

  abstract getClubById(
    /** The identifier of the club. */
    id: bigint
  ): Observable<DetailedClub>;

  abstract getClubMembersById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryAthlete[]>;

  abstract getLoggedInAthleteClubs(query?: {
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummaryClub[]>;

  abstract getGearById(
    /** The identifier of the gear. */
    id: string
  ): Observable<DetailedGear>;

  abstract getRouteAsGPX(
    /** The identifier of the route. */
    id: bigint
  ): Observable<unknown>;

  abstract getRoutesByAthleteId(
    /** The identifier of the athlete. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<Route[]>;

  abstract getRunningRaceById(
    /** The identifier of the running race. */
    id: bigint
  ): Observable<RunningRace>;

  abstract getRunningRaces(query?: {
    /** Filters the list by a given year. */
    year?: number;
  }): Observable<RunningRace[]>;

  abstract getEffortsBySegmentId(query: {
    /** The identifier of the segment. */
    segment_id: number;
    /** ISO 8601 formatted date time. */
    start_date_local?: string;
    /** ISO 8601 formatted date time. */
    end_date_local?: string;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<DetailedSegmentEffort[]>;

  abstract getSegmentEffortById(
    /** The identifier of the segment effort. */
    id: bigint
  ): Observable<DetailedSegmentEffort>;

  abstract exploreSegments(query: {
    /** The latitude and longitude for two points describing a rectangular boundary for the search: [southwest corner latitutde, southwest corner longitude, northeast corner latitude, northeast corner longitude] */
    bounds: number[];
    /** Desired activity type. May take one of the following values: running, riding */
    activity_type?: string;
    /** The minimum climbing category. */
    min_cat?: number;
    /** The maximum climbing category. */
    max_cat?: number;
  }): Observable<ExplorerResponse>;

  abstract getLoggedInAthleteStarredSegments(query?: {
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummarySegment[]>;

  abstract getSegmentById(
    /** The identifier of the segment. */
    id: bigint
  ): Observable<DetailedSegment>;

  abstract starSegment(
    /** The identifier of the segment to star. */
    id: bigint
  ): Observable<DetailedSegment>;

  abstract getActivityStreams(
    /** The identifier of the activity. */
    id: bigint,
    query: {
      /** Desired stream types. May take one of the following values: */
      keys: string[];
      /** Must be true. */
      key_by_type: boolean;
    }
  ): Observable<StreamSet>;

  abstract getRouteStreams(
    /** The identifier of the route. */
    id: bigint
  ): Observable<StreamSet>;

  abstract getSegmentEffortStreams(
    /** The identifier of the segment effort. */
    id: bigint,
    query: {
      /** The types of streams to return. May take one of the following values: */
      keys: string[];
      /** Must be true. */
      key_by_type: boolean;
    }
  ): Observable<StreamSet>;

  abstract getSegmentStreams(
    /** The identifier of the segment. */
    id: bigint,
    query: {
      /** The types of streams to return. May take one of the following values: */
      keys: string[];
      /** Must be true. */
      key_by_type: boolean;
    }
  ): Observable<StreamSet>;

  abstract createUpload(): Observable<Upload>;

  abstract getUploadById(
    /** The identifier of the upload. */
    uploadId: bigint
  ): Observable<Upload>;
}
