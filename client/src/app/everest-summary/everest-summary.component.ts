import { Component, OnInit, Input } from '@angular/core';
import { ElevationSummary } from '../club-elevation-data';
import { colorizeDatasets } from '../colorscheme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import { chartColors } from '../colorscheme';
import { activityTypes } from '../strava';

@Component({
  selector: 'app-everest-summary',
  templateUrl: './everest-summary.component.html',
  styleUrls: ['./everest-summary.component.css'],
})
export class EverestSummaryComponent implements OnInit {
  @Input() dataObs!: Observable<ElevationSummary[]>;
  chartConfigurationObs: Observable<ChartConfiguration>;

  private getConfig(data: ElevationSummary[]): ChartConfiguration {
    const labels = data.map((d) => d.name);
    const runElevations = data.map((d) => d.gains.get('Run') || 0);
    const rideElevations = data.map((d) => d.gains.get('Ride') || 0);

    const datasets = [
      {
        data: runElevations,
        label: 'Run',
      },
      {
        data: rideElevations,
        label: 'Ride',
      },
    ];

    colorizeDatasets(datasets);

    return {
      type: 'bar',
      data: {
        labels,
        datasets,
      },
      options: {
        scales: {
          xAxes: [
            {
              gridLines: {
                color: chartColors.colors.blueGrey,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: chartColors.colors.blueGrey,
              },
              scaleLabel: {
                display: true,
                labelString: 'Elevation (meters)',
              },
            },
          ],
        },
      },
    };
  }

  ngOnInit(): void {
    if (!this.dataObs) {
      throw new TypeError('Must provide an ElevationSummary[] dataObs.');
    }
    this.chartConfigurationObs = this.dataObs.pipe(
      map((data) => this.getConfig(data))
    );
  }
}
