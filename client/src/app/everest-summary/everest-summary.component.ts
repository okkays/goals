import { Component, OnInit, Input } from '@angular/core';
import { ElevationSummary } from '../club-elevation-data';
import { colorizeDatasets } from '../colorscheme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';

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
    const elevations = data.map((d) => d.elevation);

    const datasets = [
      {
        data: elevations,
        label: 'Elevation (meters)',
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
