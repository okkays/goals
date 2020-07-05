import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import { flatMap, map, shareReplay } from 'rxjs/operators';
import { ElevationSummary } from '../club-elevation-data';
import { SummaryService } from '../summary.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
})
export class ClubComponent implements OnInit {
  idObs: Observable<number>;
  elevationByTypeAndMember: Observable<ElevationSummary[]>;
  elevationSummaryData: Observable<ElevationSummary[]>;
  chartConfigurationObs: Observable<ChartConfiguration>;

  constructor(route: ActivatedRoute, elevationService: SummaryService) {
    this.idObs = route.paramMap.pipe(map((params) => Number(params.get('id'))));

    this.elevationByTypeAndMember = this.idObs.pipe(
      flatMap((id) => {
        return elevationService.elevationByMember(id);
      }),
      shareReplay(1)
    );
  }

  ngOnInit(): void {}
}
