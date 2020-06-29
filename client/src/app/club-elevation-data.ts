export interface ElevationSummary {
  /** Athlete name. */
  name: string;
  /** Total elevation in meters */
  elevation: number;
}

export interface ClubElevationData {
  summary: ElevationSummary[];
}
