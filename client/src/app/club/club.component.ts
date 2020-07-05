import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import { flatMap, map, shareReplay } from 'rxjs/operators';
import { FieldSummary, SummarizedField } from '../field-data';
import { SummaryService } from '../summary.service';
import { PropertyOfType } from '../common-util';
import { SummaryActivity } from '../strava';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  idObs: Observable<number>;
  elevationByTypeAndMember: Observable<FieldSummary[]>;
  elevationSummaryData: Observable<FieldSummary[]>;
  chartConfigurationObs: Observable<ChartConfiguration>;
  summarizedFields: Map<
    PropertyOfType<SummaryActivity, number>,
    Observable<FieldSummary[]>
  >;
  displayedFields: SummarizedField[] = [
    {
      fieldKey: 'total_elevation_gain',
      scaleLabel: 'Elevation (meters)',
    },
    {
      fieldKey: 'elapsed_time',
      scaleLabel: 'Elapsed Time (hours)',
      // Convert to hours.
      transformation: (d) => d / 3600,
    },
  ];

  constructor(
    readonly route: ActivatedRoute,
    private readonly summaryService: SummaryService
  ) {
    this.idObs = route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      shareReplay(1)
    );

    this.summarizedFields = new Map<
      PropertyOfType<SummaryActivity, number>,
      Observable<FieldSummary[]>
    >(
      this.displayedFields.map((field) => {
        return [field.fieldKey, this.getField(field.fieldKey)];
      })
    );
  }

  ngOnInit(): void {}

  private getField(fieldKey: PropertyOfType<SummaryActivity, number>) {
    return this.idObs.pipe(
      flatMap((id) => {
        return this.summaryService.fieldByMember(id, fieldKey);
      }),
      shareReplay(1)
    );
  }
}
