import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, flatMap, pluck, shareReplay } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import { ElevationSummary, ClubElevationData } from '../club-elevation-data';
import { ElevationService } from '../elevation.service';

@Component({
  selector: 'app-everest',
  templateUrl: './everest.component.html',
  styleUrls: ['./everest.component.css'],
})
export class EverestComponent implements OnInit {
  idObs: Observable<number>;
  elevationData: Observable<ClubElevationData>;
  elevationSummaryData: Observable<ElevationSummary[]>;
  chartConfigurationObs: Observable<ChartConfiguration>;

  constructor(route: ActivatedRoute, elevationService: ElevationService) {
    this.idObs = route.paramMap.pipe(map((params) => Number(params.get('id'))));

    this.elevationData = this.idObs.pipe(
      flatMap((id) => {
        return elevationService.elevationByMember(id);
      }),
      shareReplay(1)
    );

    this.elevationSummaryData = this.elevationData.pipe(pluck('summary'));

    // this.clubSummaryData = of([
    //   { name: 'Robert', elevation: 234 },
    //   { name: 'Everest', elevation: 8848 },
    // ]);
  }

  ngOnInit(): void {}
}
