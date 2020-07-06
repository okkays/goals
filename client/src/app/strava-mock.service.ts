/** Contains the Mock Service for Strava API. */
import { Injectable } from '@angular/core';
import { StravaService } from './strava.service';
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
import { Observable, of } from 'rxjs';

/** Mock Service for Strava API. */
@Injectable({ providedIn: 'root' })
export class StravaMockService extends StravaService {
  createActivity(): Observable<DetailedActivity> {
    return of(({
      id: 123456778928065,
      resource_state: 3,
      external_id: null,
      upload_id: null,
      athlete: {
        id: 12343545645788,
        resource_state: 1,
      },
      name: 'Chill Day',
      distance: 0,
      moving_time: 18373,
      elapsed_time: 18373,
      total_elevation_gain: 0,
      type: 'Ride',
      start_date: '2018-02-20T18:02:13Z',
      start_date_local: '2018-02-20T10:02:13Z',
      timezone: '(GMT-08:00) America/Los_Angeles',
      utc_offset: -28800,
      achievement_count: 0,
      kudos_count: 0,
      comment_count: 0,
      athlete_count: 1,
      photo_count: 0,
      map: {
        id: 'a12345678908766',
        polyline: null,
        resource_state: 3,
      },
      trainer: false,
      commute: false,
      manual: true,
      private: false,
      flagged: false,
      gear_id: 'b453542543',
      from_accepted_tag: null,
      average_speed: 0,
      max_speed: 0,
      device_watts: false,
      has_heartrate: false,
      pr_count: 0,
      total_photo_count: 0,
      has_kudoed: false,
      workout_type: null,
      description: null,
      calories: 0,
      segment_efforts: [],
    } as unknown) as DetailedActivity);
  }

  getActivityById(
    /** The identifier of the activity. */
    id: bigint,
    query?: {
      /** To include all segments efforts. */
      include_all_efforts?: boolean;
    }
  ): Observable<DetailedActivity> {
    return of(({
      id: 12345678987654321,
      resource_state: 3,
      external_id: 'garmin_push_12345678987654321',
      upload_id: 98765432123456789,
      athlete: {
        id: 134815,
        resource_state: 1,
      },
      name: 'Happy Friday',
      distance: 28099,
      moving_time: 4207,
      elapsed_time: 4410,
      total_elevation_gain: 516,
      type: 'Ride',
      start_date: '2018-02-16T14:52:54Z',
      start_date_local: '2018-02-16T06:52:54Z',
      timezone: '(GMT-08:00) America/Los_Angeles',
      utc_offset: -28800,
      start_latlng: [37.83, -122.26],
      end_latlng: [37.83, -122.26],
      achievement_count: 0,
      kudos_count: 19,
      comment_count: 0,
      athlete_count: 1,
      photo_count: 0,
      map: {
        id: 'a1410355832',
        polyline:
          'ki{eFvqfiVqAWQIGEEKAYJgBVqDJ{BHa@jAkNJw@Pw@V{APs@^aABQAOEQGKoJ_FuJkFqAo@{A}@sH{DiAs@Q]?WVy@`@oBt@_CB]KYMMkB{AQEI@WT{BlE{@zAQPI@ICsCqA_BcAeCmAaFmCqIoEcLeG}KcG}A}@cDaBiDsByAkAuBqBi@y@_@o@o@kB}BgIoA_EUkAMcACa@BeBBq@LaAJe@b@uA`@_AdBcD`@iAPq@RgALqAB{@EqAyAoOCy@AmCBmANqBLqAZkB\\iCPiBJwCCsASiCq@iD]eA]y@[i@w@mAa@i@k@g@kAw@i@Ya@Q]EWFMLa@~BYpAFNpA`Aj@n@X`@V`AHh@JfB@xAMvAGZGHIDIAWOEQNcC@sACYK[MSOMe@QKKKYOs@UYQISCQ?Q@WNo@r@OHGAGCKOQ_BU}@MQGG]Io@@c@FYNg@d@s@d@ODQAMOMaASs@_@a@SESAQDqBn@a@RO?KK?UBU\\kA@Y?WMo@Iy@GWQ_@WSSGg@AkABQB_Ap@_A^o@b@Q@o@IS@OHi@n@OFS?OI}@iAQMQGQC}@DOIIUK{@IUOMyBo@kASOKIQCa@L[|AgATWN[He@?QKw@FOPCh@Fx@l@TDLELKl@aAHIJEX@r@ZTDV@LENQVg@RkA@c@MeA?WFOPMf@Ej@Fj@@LGHKDM?_@_@iC?a@HKRIl@NT?FCHMFW?YEYGWQa@GYBiAIq@Gq@L_BHSHK|@WJETSLQZs@z@_A~@uA^U`@G\\CRB\\Tl@p@Th@JZ^bB`@lAHLXVLDP?LGFSKiDBo@d@wBVi@R]VYVE\\@`@Lh@Fh@CzAk@RSDQA]GYe@eAGWSiBAWBWBIJORK`@KPOPSTg@h@}Ad@o@F[E_@EGMKUGmAEYGMIMYKs@?a@J}@@_BD_@HQJMx@e@LKHKHWAo@UoAAWFmAH}@?w@C[YwAAc@HSNM|Ao@rA}@zAq@`@a@j@eAxAuBXQj@MXSR[b@gAFg@?YISOGaAHi@Xw@v@_@d@WRSFqARUHQJc@d@m@`A[VSFUBcAEU@WFULUPa@v@Y~@UrBc@dBI~@?l@P~ABt@N`HEjA]zAEp@@p@TrBCl@CTQb@k@dAg@jAU^KJYLK@k@A[Js@d@a@b@]RgBl@[FMAw@[]G]?m@D_@F]P[Vu@t@[TMF_@Do@E_@@q@P]PWZUZw@vAkAlAGJOj@IlAMd@OR{@p@a@d@sBpD]v@a@`Aa@n@]TODgBVk@Pe@^cBfBc@Rs@La@RSPm@|@wCpDS^Wp@QZML{@l@qBbCYd@k@lAIVCZBZNTr@`@RRHZANIZQPKDW@e@CaASU?I@YTKRQx@@\\VmALYRQLCL?v@P|@D\\GJEFKDM@OCa@COOYIGm@YMUCM@]JYr@uAx@kAt@}@jAeAPWbAkBj@s@bAiAz@oAj@m@VQlAc@VQ~@aA`Au@p@Q`AIv@MZORUV_@p@iB|AoCh@q@dAaANUNWH[N{AJ[^m@t@_Av@wA\\a@`@W`@In@Al@B^E`@Wl@u@\\[VQ\\K`@Eb@?R@dAZP@d@CRExAs@\\Yt@{@LG\\MjAATINOXo@d@kAl@_AHYBOCe@QiBCm@Fq@\\wADo@AyGEeBWuB@YHu@Tu@Lk@VcCTo@d@aA\\WJE`@G~@FP?VI\\U~@sANO`@SfAMj@U\\WjAsAXS`@UNENALBHFFL?^Ml@Uj@]b@q@RUJSPkChEc@XcAb@sA|@]PaA\\OJKNER?TDTNj@Jn@?p@OfC@ZR`B@VCV_@n@{@l@WbACv@OlABnAPl@LNNHbBBNBLFFJ@^GLg@x@i@|AMP[X}@XOJKPET?l@LhAFXp@fBDRCd@S\\_@Ps@PQ@}A]S?QDe@V]b@MR[fAKt@ErAF~CANILYDKGIKe@{@Yy@e@sB[gA[c@e@YUCU?WBUHUNQPq@`AiArAMV[^e@Zc@JQJKNMz@?r@Bb@PfAAfA@VVbADn@E`@KHSEe@SMAKDKFM\\^dDCh@m@LoAQ_@@MFOZLfBEl@QbASd@KLQBOAaAc@QAQ@QHc@v@ONMJOBOCg@c@]O[EMBKFGL?RHv@ARERGNe@h@{@h@WVGNDt@JLNFPFz@LdBf@f@PJNHPF`ADPJJJDl@I`@B^Tp@bALJNDNALIf@i@PGPCt@DNE`@Uv@[dAw@RITGRCtAARBPJLPJRZxB?VEX_@vAAR?RDNHJJBh@UnBm@h@IRDRJNNJPNbBFRJLLBLCzAmAd@Uf@Gf@?P@PFJNHPFTH`BDTHNJJJ@LG`@m@^YPER@RDPHNNJRLn@HRLN^VNPHTFX@\\UlDFb@FHh@NP@HKPsB?}ASkCQ{@[y@q@}@cA{@KOCQDa@t@{CFGJCf@Nl@ZtA~@r@p@`@h@rAxBd@rA\\fARdAPjANrB?f@AtBCd@QfBkAjJOlBChA?rBFrBNlBdAfKFzAC~@Iz@Mz@Sv@s@jBmAxBi@hAWt@Sv@Qx@O`BA`@?dAPfBVpAd@`BfBlFf@fBdA~Cr@pAz@fApBhBjAt@H?IL?FBFJLx@^lHvDvh@~XnElCbAd@pGhDbAb@nAr@`Ad@`GhDnBbAxCbBrWhNJJDPARGP_@t@Qh@]pAUtAoA`Ny@jJApBBNFLJFJBv@Hb@HBF?\\',
        resource_state: 3,
        summary_polyline:
          'ki{eFvqfiVsBmA`Feh@qg@iX`B}JeCcCqGjIq~@kf@cM{KeHeX`@_GdGkSeBiXtB}YuEkPwFyDeAzAe@pC~DfGc@bIOsGmCcEiD~@oBuEkFhBcBmDiEfAVuDiAuD}NnDaNiIlCyDD_CtJKv@wGhD]YyEzBo@g@uKxGmHpCGtEtI~AuLrHkAcAaIvEgH_EaDR_FpBuBg@sNxHqEtHgLoTpIiCzKNr[sB|Es\\`JyObYeMbGsMnPsAfDxAnD}DBu@bCx@{BbEEyAoD`AmChNoQzMoGhOwX|[yIzBeFKg[zAkIdU_LiHxK}HzEh@vM_BtBg@xGzDbCcF~GhArHaIfByAhLsDiJuC?_HbHd@nL_Cz@ZnEkDDy@hHwJLiCbIrNrIvN_EfAjDWlEnEiAfBxDlFkBfBtEfDaAzBvDKdFx@|@XgJmDsHhAgD`GfElEzOwBnYdBxXgGlSc@bGdHpW|HdJztBnhAgFxc@HnCvBdA',
      },
      trainer: false,
      commute: false,
      manual: false,
      private: false,
      flagged: false,
      gear_id: 'b12345678987654321',
      from_accepted_tag: false,
      average_speed: 6.679,
      max_speed: 18.5,
      average_cadence: 78.5,
      average_temp: 4,
      average_watts: 185.5,
      weighted_average_watts: 230,
      kilojoules: 780.5,
      device_watts: true,
      has_heartrate: false,
      max_watts: 743,
      elev_high: 446.6,
      elev_low: 17.2,
      pr_count: 0,
      total_photo_count: 2,
      has_kudoed: false,
      workout_type: 10,
      suffer_score: null,
      description: '',
      calories: 870.2,
      segment_efforts: [
        {
          id: 12345678987654321,
          resource_state: 2,
          name: 'Tunnel Rd.',
          activity: {
            id: 12345678987654321,
            resource_state: 1,
          },
          athlete: {
            id: 134815,
            resource_state: 1,
          },
          elapsed_time: 2038,
          moving_time: 2038,
          start_date: '2018-02-16T14:56:25Z',
          start_date_local: '2018-02-16T06:56:25Z',
          distance: 9434.8,
          start_index: 211,
          end_index: 2246,
          average_cadence: 78.6,
          device_watts: true,
          average_watts: 237.6,
          segment: {
            id: 673683,
            resource_state: 2,
            name: 'Tunnel Rd.',
            activity_type: 'Ride',
            distance: 9220.7,
            average_grade: 4.2,
            maximum_grade: 25.8,
            elevation_high: 426.5,
            elevation_low: 43.4,
            start_latlng: [37.8346153, -122.2520872],
            end_latlng: [37.8476261, -122.2008944],
            climb_category: 3,
            city: 'Oakland',
            state: 'CA',
            country: 'United States',
            private: false,
            hazardous: false,
            starred: false,
          },
          kom_rank: null,
          pr_rank: null,
          achievements: [],
          hidden: false,
        },
      ],
      splits_metric: [
        {
          distance: 1001.5,
          elapsed_time: 141,
          elevation_difference: 4.4,
          moving_time: 141,
          split: 1,
          average_speed: 7.1,
          pace_zone: 0,
        },
      ],
      laps: [
        {
          id: 4479306946,
          resource_state: 2,
          name: 'Lap 1',
          activity: {
            id: 1410355832,
            resource_state: 1,
          },
          athlete: {
            id: 134815,
            resource_state: 1,
          },
          elapsed_time: 1573,
          moving_time: 1569,
          start_date: '2018-02-16T14:52:54Z',
          start_date_local: '2018-02-16T06:52:54Z',
          distance: 8046.72,
          start_index: 0,
          end_index: 1570,
          total_elevation_gain: 276,
          average_speed: 5.12,
          max_speed: 9.5,
          average_cadence: 78.6,
          device_watts: true,
          average_watts: 233.1,
          lap_index: 1,
          split: 1,
        },
      ],
      gear: {
        id: 'b12345678987654321',
        primary: true,
        name: 'Tarmac',
        resource_state: 2,
        distance: 32547610,
      },
      partner_brand_tag: null,
      photos: {
        primary: {
          id: null,
          unique_id: '3FDGKL3-204E-4867-9E8D-89FC79EAAE17',
          urls: {
            '100':
              'https://dgtzuqphqg23d.cloudfront.net/Bv93zv5t_mr57v0wXFbY_JyvtucgmU5Ym6N9z_bKeUI-128x96.jpg',
            '600':
              'https://dgtzuqphqg23d.cloudfront.net/Bv93zv5t_mr57v0wXFbY_JyvtucgmU5Ym6N9z_bKeUI-768x576.jpg',
          },
          source: 1,
        },
        use_primary_photo: true,
        count: 2,
      },
      highlighted_kudosers: [
        {
          destination_url: 'strava://athletes/12345678987654321',
          display_name: 'Marianne V.',
          avatar_url:
            'https://dgalywyr863hv.cloudfront.net/pictures/athletes/12345678987654321/12345678987654321/3/medium.jpg',
          show_name: true,
        },
      ],
      device_name: 'Garmin Edge 1030',
      embed_token: '18e4615989b47dd4ff3dc711b0aa4502e4b311a9',
      segment_leaderboard_opt_out: false,
      leaderboard_opt_out: false,
    } as unknown) as DetailedActivity);
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
    return of(([
      {
        id: 12345678987654321,
        activity_id: 12345678987654321,
        post_id: null,
        resource_state: 2,
        text: 'Good job and keep the cat pictures coming!',
        mentions_metadata: null,
        created_at: '2018-02-08T19:25:39Z',
        athlete: {
          firstname: 'Peter',
          lastname: 'S',
        },
      },
    ] as unknown) as Comment[]);
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
    return of(([
      {
        firstname: 'Peter',
        lastname: 'S',
      },
    ] as unknown) as SummaryAthlete[]);
  }

  getLapsByActivityId(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<Lap[]> {
    return of(([
      {
        id: 12345678987654321,
        resource_state: 2,
        name: 'Lap 1',
        activity: {
          id: 12345678987654321,
          resource_state: 1,
        },
        athlete: {
          id: 12345678987654321,
          resource_state: 1,
        },
        elapsed_time: 1691,
        moving_time: 1587,
        start_date: '2018-02-08T14:13:37Z',
        start_date_local: '2018-02-08T06:13:37Z',
        distance: 8046.72,
        start_index: 0,
        end_index: 1590,
        total_elevation_gain: 270,
        average_speed: 4.76,
        max_speed: 9.4,
        average_cadence: 79,
        device_watts: true,
        average_watts: 228.2,
        lap_index: 1,
        split: 1,
      },
    ] as unknown) as Lap[]);
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
    return of(([
      {
        resource_state: 2,
        athlete: {
          id: 134815,
          resource_state: 1,
        },
        name: 'Happy Friday',
        distance: 24931.4,
        moving_time: 4500,
        elapsed_time: 4500,
        total_elevation_gain: 0,
        type: 'Ride',
        workout_type: null,
        id: 154504250376823,
        external_id: 'garmin_push_12345678987654321',
        upload_id: 987654321234567891234,
        start_date: '2018-05-02T12:15:09Z',
        start_date_local: '2018-05-02T05:15:09Z',
        timezone: '(GMT-08:00) America/Los_Angeles',
        utc_offset: -25200,
        start_latlng: null,
        end_latlng: null,
        location_city: null,
        location_state: null,
        location_country: 'United States',
        achievement_count: 0,
        kudos_count: 3,
        comment_count: 1,
        athlete_count: 1,
        photo_count: 0,
        map: {
          id: 'a12345678987654321',
          summary_polyline: null,
          resource_state: 2,
        },
        trainer: true,
        commute: false,
        manual: false,
        private: false,
        flagged: false,
        gear_id: 'b12345678987654321',
        from_accepted_tag: false,
        average_speed: 5.54,
        max_speed: 11,
        average_cadence: 67.1,
        average_watts: 175.3,
        weighted_average_watts: 210,
        kilojoules: 788.7,
        device_watts: true,
        has_heartrate: true,
        average_heartrate: 140.3,
        max_heartrate: 178,
        max_watts: 406,
        pr_count: 0,
        total_photo_count: 1,
        has_kudoed: false,
        suffer_score: 82,
      },
      {
        resource_state: 2,
        athlete: {
          id: 167560,
          resource_state: 1,
        },
        name: 'Bondcliff',
        distance: 23676.5,
        moving_time: 5400,
        elapsed_time: 5400,
        total_elevation_gain: 0,
        type: 'Ride',
        workout_type: null,
        id: 1234567809,
        external_id: 'garmin_push_12345678987654321',
        upload_id: 1234567819,
        start_date: '2018-04-30T12:35:51Z',
        start_date_local: '2018-04-30T05:35:51Z',
        timezone: '(GMT-08:00) America/Los_Angeles',
        utc_offset: -25200,
        start_latlng: null,
        end_latlng: null,
        location_city: null,
        location_state: null,
        location_country: 'United States',
        achievement_count: 0,
        kudos_count: 4,
        comment_count: 0,
        athlete_count: 1,
        photo_count: 0,
        map: {
          id: 'a12345689',
          summary_polyline: null,
          resource_state: 2,
        },
        trainer: true,
        commute: false,
        manual: false,
        private: false,
        flagged: false,
        gear_id: 'b12345678912343',
        from_accepted_tag: false,
        average_speed: 4.385,
        max_speed: 8.8,
        average_cadence: 69.8,
        average_watts: 200,
        weighted_average_watts: 214,
        kilojoules: 1080,
        device_watts: true,
        has_heartrate: true,
        average_heartrate: 152.4,
        max_heartrate: 183,
        max_watts: 403,
        pr_count: 0,
        total_photo_count: 1,
        has_kudoed: false,
        suffer_score: 162,
      },
    ] as unknown) as SummaryActivity[]);
  }

  getZonesByActivityId(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<ActivityZone[]> {
    return of(([
      {
        score: 0,
        sensor_based: true,
        custom_zones: true,
        max: 1,
        distribution_buckets: '',
        type: 'heartrate',
        points: 6,
      },
    ] as unknown) as ActivityZone[]);
  }

  updateActivityById(
    /** The identifier of the activity. */
    id: bigint
  ): Observable<DetailedActivity> {
    return of(({
      id: 12345678987654321,
      resource_state: 3,
      external_id: 'garmin_push_12345678987654321',
      upload_id: 98765432123456789,
      athlete: {
        id: 134815,
        resource_state: 1,
      },
      name: 'Happy Friday',
      distance: 28099,
      moving_time: 4207,
      elapsed_time: 4410,
      total_elevation_gain: 516,
      type: 'Ride',
      start_date: '2018-02-16T14:52:54Z',
      start_date_local: '2018-02-16T06:52:54Z',
      timezone: '(GMT-08:00) America/Los_Angeles',
      utc_offset: -28800,
      start_latlng: [37.83, -122.26],
      end_latlng: [37.83, -122.26],
      location_city: null,
      location_state: null,
      location_country: 'United States',
      achievement_count: 0,
      kudos_count: 19,
      comment_count: 0,
      athlete_count: 1,
      photo_count: 0,
      map: {
        id: 'a1410355832',
        polyline:
          'ki{eFvqfiVqAWQIGEEKAYJgBVqDJ{BHa@jAkNJw@Pw@V{APs@^aABQAOEQGKoJ_FuJkFqAo@{A}@sH{DiAs@Q]?WVy@`@oBt@_CB]KYMMkB{AQEI@WT{BlE{@zAQPI@ICsCqA_BcAeCmAaFmCqIoEcLeG}KcG}A}@cDaBiDsByAkAuBqBi@y@_@o@o@kB}BgIoA_EUkAMcACa@BeBBq@LaAJe@b@uA`@_AdBcD`@iAPq@RgALqAB{@EqAyAoOCy@AmCBmANqBLqAZkB\\iCPiBJwCCsASiCq@iD]eA]y@[i@w@mAa@i@k@g@kAw@i@Ya@Q]EWFMLa@~BYpAFNpA`Aj@n@X`@V`AHh@JfB@xAMvAGZGHIDIAWOEQNcC@sACYK[MSOMe@QKKKYOs@UYQISCQ?Q@WNo@r@OHGAGCKOQ_BU}@MQGG]Io@@c@FYNg@d@s@d@ODQAMOMaASs@_@a@SESAQDqBn@a@RO?KK?UBU\\kA@Y?WMo@Iy@GWQ_@WSSGg@AkABQB_Ap@_A^o@b@Q@o@IS@OHi@n@OFS?OI}@iAQMQGQC}@DOIIUK{@IUOMyBo@kASOKIQCa@L[|AgATWN[He@?QKw@FOPCh@Fx@l@TDLELKl@aAHIJEX@r@ZTDV@LENQVg@RkA@c@MeA?WFOPMf@Ej@Fj@@LGHKDM?_@_@iC?a@HKRIl@NT?FCHMFW?YEYGWQa@GYBiAIq@Gq@L_BHSHK|@WJETSLQZs@z@_A~@uA^U`@G\\CRB\\Tl@p@Th@JZ^bB`@lAHLXVLDP?LGFSKiDBo@d@wBVi@R]VYVE\\@`@Lh@Fh@CzAk@RSDQA]GYe@eAGWSiBAWBWBIJORK`@KPOPSTg@h@}Ad@o@F[E_@EGMKUGmAEYGMIMYKs@?a@J}@@_BD_@HQJMx@e@LKHKHWAo@UoAAWFmAH}@?w@C[YwAAc@HSNM|Ao@rA}@zAq@`@a@j@eAxAuBXQj@MXSR[b@gAFg@?YISOGaAHi@Xw@v@_@d@WRSFqARUHQJc@d@m@`A[VSFUBcAEU@WFULUPa@v@Y~@UrBc@dBI~@?l@P~ABt@N`HEjA]zAEp@@p@TrBCl@CTQb@k@dAg@jAU^KJYLK@k@A[Js@d@a@b@]RgBl@[FMAw@[]G]?m@D_@F]P[Vu@t@[TMF_@Do@E_@@q@P]PWZUZw@vAkAlAGJOj@IlAMd@OR{@p@a@d@sBpD]v@a@`Aa@n@]TODgBVk@Pe@^cBfBc@Rs@La@RSPm@|@wCpDS^Wp@QZML{@l@qBbCYd@k@lAIVCZBZNTr@`@RRHZANIZQPKDW@e@CaASU?I@YTKRQx@@\\VmALYRQLCL?v@P|@D\\GJEFKDM@OCa@COOYIGm@YMUCM@]JYr@uAx@kAt@}@jAeAPWbAkBj@s@bAiAz@oAj@m@VQlAc@VQ~@aA`Au@p@Q`AIv@MZORUV_@p@iB|AoCh@q@dAaANUNWH[N{AJ[^m@t@_Av@wA\\a@`@W`@In@Al@B^E`@Wl@u@\\[VQ\\K`@Eb@?R@dAZP@d@CRExAs@\\Yt@{@LG\\MjAATINOXo@d@kAl@_AHYBOCe@QiBCm@Fq@\\wADo@AyGEeBWuB@YHu@Tu@Lk@VcCTo@d@aA\\WJE`@G~@FP?VI\\U~@sANO`@SfAMj@U\\WjAsAXS`@UNENALBHFFL?^Ml@Uj@]b@q@RUJSPkChEc@XcAb@sA|@]PaA\\OJKNER?TDTNj@Jn@?p@OfC@ZR`B@VCV_@n@{@l@WbACv@OlABnAPl@LNNHbBBNBLFFJ@^GLg@x@i@|AMP[X}@XOJKPET?l@LhAFXp@fBDRCd@S\\_@Ps@PQ@}A]S?QDe@V]b@MR[fAKt@ErAF~CANILYDKGIKe@{@Yy@e@sB[gA[c@e@YUCU?WBUHUNQPq@`AiArAMV[^e@Zc@JQJKNMz@?r@Bb@PfAAfA@VVbADn@E`@KHSEe@SMAKDKFM\\^dDCh@m@LoAQ_@@MFOZLfBEl@QbASd@KLQBOAaAc@QAQ@QHc@v@ONMJOBOCg@c@]O[EMBKFGL?RHv@ARERGNe@h@{@h@WVGNDt@JLNFPFz@LdBf@f@PJNHPF`ADPJJJDl@I`@B^Tp@bALJNDNALIf@i@PGPCt@DNE`@Uv@[dAw@RITGRCtAARBPJLPJRZxB?VEX_@vAAR?RDNHJJBh@UnBm@h@IRDRJNNJPNbBFRJLLBLCzAmAd@Uf@Gf@?P@PFJNHPFTH`BDTHNJJJ@LG`@m@^YPER@RDPHNNJRLn@HRLN^VNPHTFX@\\UlDFb@FHh@NP@HKPsB?}ASkCQ{@[y@q@}@cA{@KOCQDa@t@{CFGJCf@Nl@ZtA~@r@p@`@h@rAxBd@rA\\fARdAPjANrB?f@AtBCd@QfBkAjJOlBChA?rBFrBNlBdAfKFzAC~@Iz@Mz@Sv@s@jBmAxBi@hAWt@Sv@Qx@O`BA`@?dAPfBVpAd@`BfBlFf@fBdA~Cr@pAz@fApBhBjAt@H?IL?FBFJLx@^lHvDvh@~XnElCbAd@pGhDbAb@nAr@`Ad@`GhDnBbAxCbBrWhNJJDPARGP_@t@Qh@]pAUtAoA`Ny@jJApBBNFLJFJBv@Hb@HBF?\\',
        resource_state: 3,
        summary_polyline:
          'ki{eFvqfiVsBmA`Feh@qg@iX`B}JeCcCqGjIq~@kf@cM{KeHeX`@_GdGkSeBiXtB}YuEkPwFyDeAzAe@pC~DfGc@bIOsGmCcEiD~@oBuEkFhBcBmDiEfAVuDiAuD}NnDaNiIlCyDD_CtJKv@wGhD]YyEzBo@g@uKxGmHpCGtEtI~AuLrHkAcAaIvEgH_EaDR_FpBuBg@sNxHqEtHgLoTpIiCzKNr[sB|Es\\`JyObYeMbGsMnPsAfDxAnD}DBu@bCx@{BbEEyAoD`AmChNoQzMoGhOwX|[yIzBeFKg[zAkIdU_LiHxK}HzEh@vM_BtBg@xGzDbCcF~GhArHaIfByAhLsDiJuC?_HbHd@nL_Cz@ZnEkDDy@hHwJLiCbIrNrIvN_EfAjDWlEnEiAfBxDlFkBfBtEfDaAzBvDKdFx@|@XgJmDsHhAgD`GfElEzOwBnYdBxXgGlSc@bGdHpW|HdJztBnhAgFxc@HnCvBdA',
      },
      trainer: false,
      commute: false,
      manual: false,
      private: false,
      flagged: false,
      gear_id: 'b12345678987654321',
      from_accepted_tag: false,
      average_speed: 6.679,
      max_speed: 18.5,
      average_cadence: 78.5,
      average_temp: 4,
      average_watts: 185.5,
      weighted_average_watts: 230,
      kilojoules: 780.5,
      device_watts: true,
      has_heartrate: false,
      max_watts: 743,
      elev_high: 446.6,
      elev_low: 17.2,
      pr_count: 0,
      total_photo_count: 2,
      has_kudoed: false,
      workout_type: 10,
      suffer_score: null,
      description: '',
      calories: 870.2,
      segment_efforts: [
        {
          id: 12345678987654321,
          resource_state: 2,
          name: 'Tunnel Rd.',
          activity: {
            id: 12345678987654321,
            resource_state: 1,
          },
          athlete: {
            id: 12345678987654321,
            resource_state: 1,
          },
          elapsed_time: 2038,
          moving_time: 2038,
          start_date: '2018-02-16T14:56:25Z',
          start_date_local: '2018-02-16T06:56:25Z',
          distance: 9434.8,
          start_index: 211,
          end_index: 2246,
          average_cadence: 78.6,
          device_watts: true,
          average_watts: 237.6,
          segment: {
            id: 673683,
            resource_state: 2,
            name: 'Tunnel Rd.',
            activity_type: 'Ride',
            distance: 9220.7,
            average_grade: 4.2,
            maximum_grade: 25.8,
            elevation_high: 426.5,
            elevation_low: 43.4,
            start_latlng: [37.8346153, -122.2520872],
            end_latlng: [37.8476261, -122.2008944],
            climb_category: 3,
            city: 'Oakland',
            state: 'CA',
            country: 'United States',
            private: false,
            hazardous: false,
            starred: false,
          },
          kom_rank: null,
          pr_rank: null,
          achievements: [],
          hidden: false,
        },
      ],
      splits_metric: [
        {
          distance: 1001.5,
          elapsed_time: 141,
          elevation_difference: 4.4,
          moving_time: 141,
          split: 1,
          average_speed: 7.1,
          pace_zone: 0,
        },
      ],
      laps: [
        {
          id: 4479306946,
          resource_state: 2,
          name: 'Lap 1',
          activity: {
            id: 1410355832,
            resource_state: 1,
          },
          athlete: {
            id: 134815,
            resource_state: 1,
          },
          elapsed_time: 1573,
          moving_time: 1569,
          start_date: '2018-02-16T14:52:54Z',
          start_date_local: '2018-02-16T06:52:54Z',
          distance: 8046.72,
          start_index: 0,
          end_index: 1570,
          total_elevation_gain: 276,
          average_speed: 5.12,
          max_speed: 9.5,
          average_cadence: 78.6,
          device_watts: true,
          average_watts: 233.1,
          lap_index: 1,
          split: 1,
        },
      ],
      gear: {
        id: 'b12345678987654321',
        primary: true,
        name: 'Tarmac',
        resource_state: 2,
        distance: 32547610,
      },
      partner_brand_tag: null,
      photos: {
        primary: {
          id: null,
          unique_id: '3FDGKL3-204E-4867-9E8D-89FC79EAAE17',
          urls: {
            '100':
              'https://dgtzuqphqg23d.cloudfront.net/Bv93zv5t_mr57v0wXFbY_JyvtucgmU5Ym6N9z_bKeUI-128x96.jpg',
            '600':
              'https://dgtzuqphqg23d.cloudfront.net/Bv93zv5t_mr57v0wXFbY_JyvtucgmU5Ym6N9z_bKeUI-768x576.jpg',
          },
          source: 1,
        },
        use_primary_photo: true,
        count: 2,
      },
      highlighted_kudosers: [
        {
          destination_url: 'strava://athletes/12345678987654321',
          display_name: 'Marianne V.',
          avatar_url:
            'https://dgalywyr863hv.cloudfront.net/pictures/athletes/12345678987654321/12345678987654321/3/medium.jpg',
          show_name: true,
        },
      ],
      device_name: 'Garmin Edge 1030',
      embed_token: '18e4615989b47dd4ff3dc711b0aa4502e4b311a9',
      segment_leaderboard_opt_out: false,
      leaderboard_opt_out: false,
    } as unknown) as DetailedActivity);
  }

  getLoggedInAthlete(): Observable<DetailedAthlete> {
    return of(({
      id: 1234567890987654321,
      username: 'marianne_t',
      resource_state: 3,
      firstname: 'Marianne',
      lastname: 'Teutenberg',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      sex: 'F',
      premium: true,
      created_at: '2017-11-14T02:30:05Z',
      updated_at: '2018-02-06T19:32:20Z',
      badge_type_id: 4,
      profile_medium:
        'https://xxxxxx.cloudfront.net/pictures/athletes/123456789/123456789/2/medium.jpg',
      profile:
        'https://xxxxx.cloudfront.net/pictures/athletes/123456789/123456789/2/large.jpg',
      friend: null,
      follower: null,
      follower_count: 5,
      friend_count: 5,
      mutual_friend_count: 0,
      athlete_type: 1,
      date_preference: '%m/%d/%Y',
      measurement_preference: 'feet',
      clubs: [],
      ftp: null,
      weight: 0,
      bikes: [
        {
          id: 'b12345678987655',
          primary: true,
          name: 'EMC',
          resource_state: 2,
          distance: 0,
        },
      ],
      shoes: [
        {
          id: 'g12345678987655',
          primary: true,
          name: 'adidas',
          resource_state: 2,
          distance: 4904,
        },
      ],
    } as unknown) as DetailedAthlete);
  }

  getLoggedInAthleteZones(): Observable<Zones> {
    return of(([
      {
        distribution_buckets: [
          {
            max: 0,
            min: 0,
            time: 1498,
          },
          {
            max: 50,
            min: 0,
            time: 62,
          },
          {
            max: 100,
            min: 50,
            time: 169,
          },
          {
            max: 150,
            min: 100,
            time: 536,
          },
          {
            max: 200,
            min: 150,
            time: 672,
          },
          {
            max: 250,
            min: 200,
            time: 821,
          },
          {
            max: 300,
            min: 250,
            time: 529,
          },
          {
            max: 350,
            min: 300,
            time: 251,
          },
          {
            max: 400,
            min: 350,
            time: 80,
          },
          {
            max: 450,
            min: 400,
            time: 81,
          },
          {
            max: -1,
            min: 450,
            time: 343,
          },
        ],
        type: 'power',
        resource_state: 3,
        sensor_based: true,
      },
    ] as unknown) as Zones);
  }

  getStats(
    /** The identifier of the athlete. Must match the authenticated athlete. */
    id: bigint
  ): Observable<ActivityStats> {
    return of(({
      recent_run_totals: '',
      all_run_totals: '',
      recent_swim_totals: '',
      biggest_ride_distance: 0.8008281904610115,
      ytd_swim_totals: '',
      all_swim_totals: '',
      recent_ride_totals: {
        distance: 5.962134,
        achievement_count: 9,
        count: 1,
        elapsed_time: 2,
        elevation_gain: 7.0614014,
        moving_time: 5,
      },
      biggest_climb_elevation_gain: 6.027456183070403,
      ytd_ride_totals: '',
      all_ride_totals: '',
      ytd_run_totals: '',
    } as unknown) as ActivityStats);
  }

  updateLoggedInAthlete(
    /** The weight of the athlete in kilograms. */
    weight: number
  ): Observable<DetailedAthlete> {
    return of(({
      id: 12345678987655098765444,
      username: 'marianne_v',
      resource_state: 3,
      firstname: 'Marianne',
      lastname: 'V.',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      sex: 'F',
      premium: true,
      created_at: '2017-11-14T02:30:05Z',
      updated_at: '2018-02-06T19:32:20Z',
      badge_type_id: 4,
      profile_medium:
        'https://xxxxxx.cloudfront.net/pictures/athletes/1234567898765509876/1234567898765509876/2/medium.jpg',
      profile:
        'https://xxxxx.cloudfront.net/pictures/athletes/1234567898765509876/1234567898765509876/2/large.jpg',
      friend: null,
      follower: null,
      follower_count: 5,
      friend_count: 5,
      mutual_friend_count: 0,
      athlete_type: 1,
      date_preference: '%m/%d/%Y',
      measurement_preference: 'feet',
      clubs: [],
      ftp: null,
      weight: 0,
      bikes: [
        {
          id: 'b1234567898765509876',
          primary: true,
          name: 'EMC',
          resource_state: 2,
          distance: 0,
        },
      ],
      shoes: [
        {
          id: 'g1234567898765509876',
          primary: true,
          name: 'adidas',
          resource_state: 2,
          distance: 4904,
        },
      ],
    } as unknown) as DetailedAthlete);
  }

  getClubActivitiesById(
    /** The identifier of the club. */
    id: bigint,
    query?: {
      /** Page number. Defaults to 1. */
      page?: number;
      /** Number of items per page. Defaults to 30. */
      per_page?: number;
    }
  ): Observable<SummaryActivity[]> {
    return of(([
      {
        resource_state: 2,
        athlete: {
          resource_state: 2,
          firstname: 'Peter',
          lastname: 'S.',
        },
        name: 'World Championship',
        distance: 2641.7,
        moving_time: 577,
        elapsed_time: 635,
        total_elevation_gain: 8.8,
        type: 'Ride',
        workout_type: null,
      },
    ] as unknown) as SummaryActivity[]);
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
    return of(([
      {
        resource_state: 2,
        firstname: 'Peter',
        lastname: 'S.',
      },
    ] as unknown) as SummaryAthlete[]);
  }

  getClubById(
    /** The identifier of the club. */
    id: bigint
  ): Observable<DetailedClub> {
    return of(({
      id: 1,
      resource_state: 3,
      name: 'Team Strava Cycling',
      profile_medium:
        'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1/1582/4/medium.jpg',
      profile:
        'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1/1582/4/large.jpg',
      cover_photo:
        'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1/4328276/1/large.jpg',
      cover_photo_small:
        'https://dgalywyr863hv.cloudfront.net/pictures/clubs/1/4328276/1/small.jpg',
      sport_type: 'cycling',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      private: true,
      member_count: 116,
      featured: false,
      verified: false,
      url: 'team-strava-bike',
      membership: 'member',
      admin: false,
      owner: false,
      description: 'Private club for Cyclists who work at Strava.',
      club_type: 'company',
      post_count: 29,
      owner_id: 759,
      following_count: 107,
    } as unknown) as DetailedClub);
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
    return of(([
      {
        resource_state: 2,
        firstname: 'Peter',
        lastname: 'S.',
        membership: 'member',
        admin: false,
        owner: false,
      },
    ] as unknown) as SummaryAthlete[]);
  }

  getLoggedInAthleteClubs(query?: {
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummaryClub[]> {
    return of(([
      {
        id: 231407,
        resource_state: 2,
        name: 'The Strava Club',
        profile_medium:
          'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5319085/1/medium.jpg',
        profile:
          'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5319085/1/large.jpg',
        cover_photo:
          'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5098428/4/large.jpg',
        cover_photo_small:
          'https://dgalywyr863hv.cloudfront.net/pictures/clubs/231407/5098428/4/small.jpg',
        sport_type: 'other',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        private: false,
        member_count: 93151,
        featured: false,
        verified: true,
        url: 'strava',
      },
    ] as unknown) as SummaryClub[]);
  }

  getGearById(
    /** The identifier of the gear. */
    id: string
  ): Observable<DetailedGear> {
    return of(({
      id: 'b1231',
      primary: false,
      resource_state: 3,
      distance: 388206,
      brand_name: 'BMC',
      model_name: 'Teammachine',
      frame_type: 3,
      description: 'My Bike.',
    } as unknown) as DetailedGear);
  }

  getRouteAsGPX(
    /** The identifier of the route. */
    id: bigint
  ): Observable<unknown> {
    return of(({
      private: true,
      distance: 0.8008282,
      athlete: '',
      description: 'aeiou',
      elevation_gain: 6.0274563,
      type: 5,
      segments: [
        {
          country: 'aeiou',
          private: true,
          distance: 9.301444,
          average_grade: 3.6160767,
          maximum_grade: 2.027123,
          climb_category: 1,
          city: 'aeiou',
          elevation_high: 4.145608,
          athlete_pr_effort: {
            distance: 7.4577446,
            start_date_local: '2000-01-23T04:56:07.000+00:00',
            activity_id: 1,
            elapsed_time: 6,
            is_kom: true,
            id: 1,
            start_date: '2000-01-23T04:56:07.000+00:00',
          },
          athlete_segment_stats: {
            pr_elapsed_time: 4,
            pr_date: '2000-01-23T04:56:07.000+00:00',
            effort_count: 5,
            pr_activity_id: 1,
          },
          start_latlng: '',
          elevation_low: 7.386282,
          end_latlng: '',
          activity_type: 'Ride',
          name: 'aeiou',
          id: 7,
          state: 'aeiou',
        },
      ],
      starred: true,
      sub_type: 2,
      id_str: 'aeiou',
      name: 'aeiou',
      id: 1,
      map: {
        summary_polyline: 'aeiou',
        id: 'aeiou',
        polyline: 'aeiou',
      },
      timestamp: 5,
    } as unknown) as unknown);
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
    return of(([
      {
        private: true,
        distance: 0.8008282,
        athlete: '',
        description: 'aeiou',
        elevation_gain: 6.0274563,
        type: 5,
        segments: [
          {
            country: 'aeiou',
            private: true,
            distance: 9.301444,
            average_grade: 3.6160767,
            maximum_grade: 2.027123,
            climb_category: 1,
            city: 'aeiou',
            elevation_high: 4.145608,
            athlete_pr_effort: {
              distance: 7.4577446,
              start_date_local: '2000-01-23T04:56:07.000+00:00',
              activity_id: 1,
              elapsed_time: 6,
              is_kom: true,
              id: 1,
              start_date: '2000-01-23T04:56:07.000+00:00',
            },
            athlete_segment_stats: {
              pr_elapsed_time: 4,
              pr_date: '2000-01-23T04:56:07.000+00:00',
              effort_count: 5,
              pr_activity_id: 1,
            },
            start_latlng: '',
            elevation_low: 7.386282,
            end_latlng: '',
            activity_type: 'Ride',
            name: 'aeiou',
            id: 7,
            state: 'aeiou',
          },
        ],
        starred: true,
        sub_type: 2,
        id_str: 'aeiou',
        name: 'aeiou',
        id: 1,
        map: {
          summary_polyline: 'aeiou',
          id: 'aeiou',
          polyline: 'aeiou',
        },
        timestamp: 5,
      },
    ] as unknown) as Route[]);
  }

  getRunningRaceById(
    /** The identifier of the running race. */
    id: bigint
  ): Observable<RunningRace> {
    return of(({
      country: 'aeiou',
      route_ids: [5],
      running_race_type: 6,
      distance: 1.4658129,
      website_url: 'aeiou',
      city: 'aeiou',
      start_date_local: '2000-01-23T04:56:07.000+00:00',
      name: 'aeiou',
      measurement_preference: 'feet',
      id: 0,
      state: 'aeiou',
      url: 'aeiou',
    } as unknown) as RunningRace);
  }

  getRunningRaces(query?: {
    /** Filters the list by a given year. */
    year?: number;
  }): Observable<RunningRace[]> {
    return of(([
      {
        country: 'aeiou',
        route_ids: [5],
        running_race_type: 6,
        distance: 1.4658129,
        website_url: 'aeiou',
        city: 'aeiou',
        start_date_local: '2000-01-23T04:56:07.000+00:00',
        name: 'aeiou',
        measurement_preference: 'feet',
        id: 0,
        state: 'aeiou',
        url: 'aeiou',
      },
    ] as unknown) as RunningRace[]);
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
    return of(([
      {
        id: 123456789,
        resource_state: 2,
        name: "Alpe d'Huez",
        activity: {
          id: 1234567890,
          resource_state: 1,
        },
        athlete: {
          id: 123445678689,
          resource_state: 1,
        },
        elapsed_time: 1657,
        moving_time: 1642,
        start_date: '2007-09-15T08:15:29Z',
        start_date_local: '2007-09-15T09:15:29Z',
        distance: 6148.92,
        start_index: 1102,
        end_index: 1366,
        device_watts: false,
        average_watts: 220.2,
        segment: {
          id: 788127,
          resource_state: 2,
          name: "Alpe d'Huez",
          activity_type: 'Ride',
          distance: 6297.46,
          average_grade: 4.8,
          maximum_grade: 16.3,
          elevation_high: 416,
          elevation_low: 104.6,
          start_latlng: [52.98501000581467, -3.1869720001197366],
          end_latlng: [53.02204074375785, -3.2039630001245736],
          climb_category: 2,
          city: "Le Bourg D'Oisans",
          state: 'RA',
          country: 'France',
          private: false,
          hazardous: false,
          starred: false,
        },
        kom_rank: null,
        pr_rank: null,
        achievements: [],
      },
    ] as unknown) as DetailedSegmentEffort[]);
  }

  getSegmentEffortById(
    /** The identifier of the segment effort. */
    id: bigint
  ): Observable<DetailedSegmentEffort> {
    return of(({
      id: 1234556789,
      resource_state: 3,
      name: "Alpe d'Huez",
      activity: {
        id: 3454504,
        resource_state: 1,
      },
      athlete: {
        id: 54321,
        resource_state: 1,
      },
      elapsed_time: 381,
      moving_time: 340,
      start_date: '2018-02-12T16:12:41Z',
      start_date_local: '2018-02-12T08:12:41Z',
      distance: 83,
      start_index: 65,
      end_index: 83,
      segment: {
        id: 63450,
        resource_state: 2,
        name: "Alpe d'Huez",
        activity_type: 'Run',
        distance: 780.35,
        average_grade: -0.5,
        maximum_grade: 0,
        elevation_high: 21,
        elevation_low: 17.2,
        start_latlng: [37.808407654682, -122.426682919323],
        end_latlng: [37.808297909724, -122.421324329674],
        climb_category: 0,
        city: 'San Francisco',
        state: 'CA',
        country: 'United States',
        private: false,
        hazardous: false,
        starred: false,
      },
      kom_rank: null,
      pr_rank: null,
      achievements: [],
      athlete_segment_stats: {
        pr_elapsed_time: 212,
        pr_date: '2015-02-12',
        effort_count: 149,
      },
    } as unknown) as DetailedSegmentEffort);
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
    return of(({
      segments: [
        {
          id: 229781,
          resource_state: 2,
          name: 'Hawk Hill',
          climb_category: 1,
          climb_category_desc: '4',
          avg_grade: 5.7,
          start_latlng: [37.8331119, -122.4834356],
          end_latlng: [37.8280722, -122.4981393],
          elev_difference: 152.8,
          distance: 2684.8,
          points:
            '}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@',
          starred: false,
        },
      ],
    } as unknown) as ExplorerResponse);
  }

  getLoggedInAthleteStarredSegments(query?: {
    /** Page number. Defaults to 1. */
    page?: number;
    /** Number of items per page. Defaults to 30. */
    per_page?: number;
  }): Observable<SummarySegment[]> {
    return of(({
      id: 229781,
      resource_state: 3,
      name: 'Hawk Hill',
      activity_type: 'Ride',
      distance: 2684.82,
      average_grade: 5.7,
      maximum_grade: 14.2,
      elevation_high: 245.3,
      elevation_low: 92.4,
      start_latlng: [37.8331119, -122.4834356],
      end_latlng: [37.8280722, -122.4981393],
      climb_category: 1,
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      private: false,
      hazardous: false,
      starred: false,
      created_at: '2009-09-21T20:29:41Z',
      updated_at: '2018-02-15T09:04:18Z',
      total_elevation_gain: 155.733,
      map: {
        id: 's229781',
        polyline:
          '}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@',
        resource_state: 3,
      },
      effort_count: 309974,
      athlete_count: 30623,
      star_count: 2428,
      athlete_segment_stats: {
        pr_elapsed_time: 553,
        pr_date: '1993-04-03',
        effort_count: 2,
      },
    } as unknown) as SummarySegment[]);
  }

  getSegmentById(
    /** The identifier of the segment. */
    id: bigint
  ): Observable<DetailedSegment> {
    return of(({
      id: 229781,
      resource_state: 3,
      name: 'Hawk Hill',
      activity_type: 'Ride',
      distance: 2684.82,
      average_grade: 5.7,
      maximum_grade: 14.2,
      elevation_high: 245.3,
      elevation_low: 92.4,
      start_latlng: [37.8331119, -122.4834356],
      end_latlng: [37.8280722, -122.4981393],
      climb_category: 1,
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      private: false,
      hazardous: false,
      starred: false,
      created_at: '2009-09-21T20:29:41Z',
      updated_at: '2018-02-15T09:04:18Z',
      total_elevation_gain: 155.733,
      map: {
        id: 's229781',
        polyline:
          '}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@',
        resource_state: 3,
      },
      effort_count: 309974,
      athlete_count: 30623,
      star_count: 2428,
      athlete_segment_stats: {
        pr_elapsed_time: 553,
        pr_date: '1993-04-03',
        effort_count: 2,
      },
    } as unknown) as DetailedSegment);
  }

  starSegment(
    /** The identifier of the segment to star. */
    id: bigint
  ): Observable<DetailedSegment> {
    return of(({
      id: 229781,
      resource_state: 3,
      name: 'Hawk Hill',
      activity_type: 'Ride',
      distance: 2684.82,
      average_grade: 5.7,
      maximum_grade: 14.2,
      elevation_high: 245.3,
      elevation_low: 92.4,
      start_latlng: [37.8331119, -122.4834356],
      end_latlng: [37.8280722, -122.4981393],
      climb_category: 1,
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      private: false,
      hazardous: false,
      starred: false,
      created_at: '2009-09-21T20:29:41Z',
      updated_at: '2018-02-15T09:04:18Z',
      total_elevation_gain: 155.733,
      map: {
        id: 's229781',
        polyline:
          '}g|eFnpqjVl@En@Md@HbAd@d@^h@Xx@VbARjBDh@OPQf@w@d@k@XKXDFPH\\EbGT`AV`@v@|@NTNb@?XOb@cAxAWLuE@eAFMBoAv@eBt@q@b@}@tAeAt@i@dAC`AFZj@dB?~@[h@MbAVn@b@b@\\d@Eh@Qb@_@d@eB|@c@h@WfBK|AMpA?VF\\\\t@f@t@h@j@|@b@hCb@b@XTd@Bl@GtA?jAL`ALp@Tr@RXd@Rx@Pn@^Zh@Tx@Zf@`@FTCzDy@f@Yx@m@n@Op@VJr@',
        resource_state: 3,
      },
      effort_count: 309974,
      athlete_count: 30623,
      star_count: 2428,
      athlete_segment_stats: {
        pr_elapsed_time: 553,
        pr_date: '1993-04-03',
        effort_count: 2,
      },
    } as unknown) as DetailedSegment);
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
    return of(([
      {
        type: 'distance',
        data: [2.9, 5.8, 8.5, 11.7, 15, 19, 23.2, 28, 32.8, 38.1, 43.8, 49.5],
        series_type: 'distance',
        original_size: 12,
        resolution: 'high',
      },
    ] as unknown) as StreamSet);
  }

  getRouteStreams(
    /** The identifier of the route. */
    id: bigint
  ): Observable<StreamSet> {
    return of(([
      {
        type: 'latlng',
        data: [
          [37.833112, -122.483436],
          [37.832964, -122.483406],
        ],
      },
      {
        type: 'distance',
        data: [0, 16.8],
      },
      {
        type: 'altitude',
        data: [92.4, 93.4],
      },
    ] as unknown) as StreamSet);
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
    return of(([
      {
        type: 'distance',
        data: [
          904.5,
          957.8,
          963.1,
          989.1,
          1011.9,
          1049.7,
          1082.4,
          1098.1,
          1113.2,
          1124.7,
          1139.2,
          1142.1,
          1170.4,
          1173,
        ],
        series_type: 'distance',
        original_size: 14,
        resolution: 'high',
      },
    ] as unknown) as StreamSet);
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
    return of(([
      {
        type: 'latlng',
        data: [
          [37.833112, -122.483436],
          [37.832964, -122.483406],
        ],
        series_type: 'distance',
        original_size: 2,
        resolution: 'high',
      },
      {
        type: 'distance',
        data: [0, 16.8],
        series_type: 'distance',
        original_size: 2,
        resolution: 'high',
      },
      {
        type: 'altitude',
        data: [92.4, 93.4],
        series_type: 'distance',
        original_size: 2,
        resolution: 'high',
      },
    ] as unknown) as StreamSet);
  }

  createUpload(): Observable<Upload> {
    return of(({
      id_str: 'aeiou',
      activity_id: 6,
      external_id: 'aeiou',
      id: 0,
      error: 'aeiou',
      status: 'aeiou',
    } as unknown) as Upload);
  }

  getUploadById(
    /** The identifier of the upload. */
    uploadId: bigint
  ): Observable<Upload> {
    return of(({
      id_str: 'aeiou',
      activity_id: 6,
      external_id: 'aeiou',
      id: 0,
      error: 'aeiou',
      status: 'aeiou',
    } as unknown) as Upload);
  }
}
