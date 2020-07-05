import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Observable } from 'rxjs';
import { flatMap, map, shareReplay } from 'rxjs/operators';
import { FieldSummary } from '../club-data';
import { SummaryService } from '../summary.service';

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
