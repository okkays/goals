import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-everest',
  templateUrl: './everest.component.html',
  styleUrls: ['./everest.component.css'],
})
export class EverestComponent implements OnInit {
  clubIdObs: Observable<number>;
  chartConfigurationObs: Observable<ChartConfiguration>;

  constructor(route: ActivatedRoute) {
    this.clubIdObs = route.paramMap.pipe(
      map((params) => Number(params.get('clubId')))
    );

    const clubData = [
      { name: 'Robert', elevation: 234 },
      { name: 'Everest', elevation: 8848 },
    ];

    const labels = clubData.map((d) => d.name);
    const elevations = clubData.map((d) => d.elevation);

    this.chartConfigurationObs = of({
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            data: elevations,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Elevation (meters)',
              },
            },
          ],
        },
      },
    }).pipe(delay(1000));
  }

  ngOnInit(): void {}
}
