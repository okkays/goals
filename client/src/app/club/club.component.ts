import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';
import { flatMap, map, shareReplay } from 'rxjs/operators';
import { FieldSummary, FieldConfig } from '../field-data';
import { SummaryService } from '../summary.service';
import { PropertyOfType } from '../common-util';
import { SummaryActivity } from '../strava';
import { StravaService } from '../strava.service';
import * as moment from 'moment';

interface ClubFilters {
  startDate: moment.Moment;
}

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  idObs: Observable<bigint>;
  chartConfigurationObs: Observable<ChartConfiguration>;
  clubNameObs: Observable<string>;
  fieldSummaries: Map<
    PropertyOfType<SummaryActivity, number>,
    Observable<FieldSummary[]>
  >;
  displayedFields: FieldConfig[] = [
    {
      fieldKey: 'distance',
      scaleLabel: 'Distance (km)',
      // Convert meters to km.
      transformation: (d) => d / 1000,
    },
    {
      fieldKey: 'total_elevation_gain',
      scaleLabel: 'Elevation (meters)',
    },
    {
      fieldKey: 'elapsed_time',
      scaleLabel: 'Elapsed Time (hours)',
      // Convert seconds to hours.
      transformation: (d) => d / 3600,
    },
  ];

  // Prevent super big queries eating API limits.
  maxDate = moment().toDate();
  minDate = moment().subtract(1, 'months').toDate();
  filters = {
    startDate: moment(this.maxDate).subtract(1, 'weeks').toDate(),
  };

  private readonly filtersSubject = new ReplaySubject<ClubFilters>(1);

  constructor(
    readonly route: ActivatedRoute,
    private readonly stravaService: StravaService,
    private readonly summaryService: SummaryService
  ) {
    this.idObs = route.paramMap.pipe(
      map((params) => BigInt(params.get('id'))),
      shareReplay(1)
    );

    this.clubNameObs = this.idObs.pipe(
      flatMap((id) => {
        return this.stravaService.getClubById(id);
      }),
      map((detailedClub) => detailedClub.name)
    );

    this.fieldSummaries = new Map<
      PropertyOfType<SummaryActivity, number>,
      Observable<FieldSummary[]>
    >(
      this.displayedFields.map((field) => {
        return [field.fieldKey, this.getField(field.fieldKey)];
      })
    );
  }

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters() {
    this.filtersSubject.next({
      startDate: moment(this.filters.startDate),
    });
  }

  private getField(fieldKey: PropertyOfType<SummaryActivity, number>) {
    return combineLatest([this.idObs, this.filtersSubject]).pipe(
      flatMap(([id, filters]) => {
        return this.summaryService.fieldByMember(
          id,
          fieldKey,
          filters.startDate
        );
      }),
      shareReplay(1)
    );
  }
}
