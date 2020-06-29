/**
 * Enough parts of the Strava API to meet the needs of strava.service.
 *
 * See https://developers.strava.com/docs/reference.
 */

type LatLng = [number, number];

export const activityTypes = [
  'AlpineSki',
  'BackcountrySki',
  'Canoeing',
  'Crossfit',
  'EBikeRide',
  'Elliptical',
  'Golf',
  'Handcycle',
  'Hike',
  'IceSkate',
  'InlineSkate',
  'Kayaking',
  'Kitesurf',
  'NordicSki',
  'Ride',
  'RockClimbing',
  'RollerSki',
  'Rowing',
  'Run',
  'Sail',
  'Skateboard',
  'Snowboard',
  'Snowshoe',
  'Soccer',
  'StairStepper',
  'StandUpPaddling',
  'Surfing',
  'Swim',
  'Velomobile',
  'VirtualRide',
  'VirtualRun',
  'Walk',
  'WeightTraining',
  'Wheelchair',
  'Windsurf',
  'Workout',
  'Yoga',
] as const;
export type ActivityType = typeof activityTypes[number];

export declare interface MetaAthlete {
  /** The unique identifier of the athlete. */
  id: number;
}

export declare interface PolylineMap {
  /** The identifier of the map. */
  id: string;
  /** The polyline of the map, only returned on detailed representation of an object. */
  polyline: string;
  /** The summary polyline of the map. */
  summary_polyline: string;
}

export declare interface SummaryActivity {
  /** The unique identifier of the activity. */
  id: number;
  /** The identifier provided at upload time. */
  external_id: string;
  /** The identifier of the upload that resulted in this activity. */
  upload_id: number;
  /** An instance of MetaAthlete. */
  athlete: MetaAthlete;
  /** The name of the activity. */
  name: string;
  /** The activity's distance, in meters. */
  distance: number;
  /** The activity's moving time, in seconds. */
  moving_time: number;
  /** The activity's elapsed time, in seconds. */
  elapsed_time: number;
  /** The activity's total elevation gain. */
  total_elevation_gain: number;
  /** The activity's highest elevation, in meters. */
  elev_high: number;
  /** The activity's lowest elevation, in meters. */
  elev_low: number;
  /** An instance of ActivityType. */
  type: ActivityType;
  /** The time at which the activity was started. */
  start_date: string;
  /** The time at which the activity was started in the local timezone. */
  start_date_local: string;
  /** The timezone of the activity. */
  timezone: string;
  /** An instance of LatLng. */
  start_latlng: LatLng;
  /** An instance of LatLng. */
  end_latlng: LatLng;
  /** The number of achievements gained during this activity. */
  achievement_count: number;
  /** The number of kudos given for this activity. */
  kudos_count: number;
  /** The number of comments for this activity. */
  comment_count: number;
  /** The number of athletes for taking part in a group activity. */
  athlete_count: number;
  /** The number of Instagram photos for this activity. */
  photo_count: number;
  /** The number of Instagram and Strava photos for this activity. */
  total_photo_count: number;
  /** An instance of PolylineMap. */
  map: PolylineMap;
  /** Whether this activity was recorded on a training machine. */
  trainer: boolean;
  /** Whether this activity is a commute. */
  commute: boolean;
  /** Whether this activity was created manually. */
  manual: boolean;
  /** Whether this activity is private. */
  private: boolean;
  /** Whether this activity is flagged. */
  flagged: boolean;
  /** The activity's workout type. */
  workout_type: number;
  /** The unique identifier of the upload in string format. */
  upload_id_str: string;
  /** The activity's average speed, in meters per second. */
  average_speed: number;
  /** The activity's max speed, in meters per second. */
  max_speed: number;
  /** Whether the logged-in athlete has kudoed this activity. */
  has_kudoed: boolean;
  /** The id of the gear for the activity. */
  gear_id: string;
  /** The total work done in kilojoules during this activity. Rides only. */
  kilojoules: number;
  /** Average power output in watts during this activity. Rides only. */
  average_watts: number;
  /** Whether the watts are from a power meter, false if estimated. */
  device_watts: boolean;
  /** Rides with power meter data only. */
  max_watts: number;
  /** Similar to Normalized Power. Rides with power meter data onlySummaryActivity. */
  weighted_average_watts: number;
}
