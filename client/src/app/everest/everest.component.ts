import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import { ElevationSummary } from '../club-elevation-data';

@Component({
  selector: 'app-everest',
  templateUrl: './everest.component.html',
  styleUrls: ['./everest.component.css'],
})
export class EverestComponent implements OnInit {
  clubIdObs: Observable<number>;
  clubSummaryData: Observable<ElevationSummary[]>;
  chartConfigurationObs: Observable<ChartConfiguration>;

  constructor(route: ActivatedRoute) {
    this.clubIdObs = route.paramMap.pipe(
      map((params) => Number(params.get('clubId')))
    );

    this.clubSummaryData = of([
      { name: 'Robert', elevation: 234 },
      { name: 'Everest', elevation: 8848 },
    ]);
  }

  ngOnInit(): void {}
}
