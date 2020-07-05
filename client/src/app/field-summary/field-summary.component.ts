import { Component, OnInit, Input } from '@angular/core';
import { FieldSummary } from '../club-data';
import { colorizeDatasets } from '../colorscheme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import { chartColors } from '../colorscheme';
import { activityTypes, ActivityType } from '../strava';

@Component({
  selector: 'app-field-summary',
  templateUrl: './field-summary.component.html',
  styleUrls: ['./field-summary.component.css'],
})
export class FieldSummaryComponent implements OnInit {
  @Input() dataObs!: Observable<FieldSummary[]>;
  chartConfigurationObs: Observable<ChartConfiguration>;
  @Input() scaleLabel: string;

  private getConfig(data: FieldSummary[]): ChartConfiguration {
    const labels = data.map((d) => d.name);
    const datasets = activityTypes
      .map((activityType) => {
        return {
          label: activityType,
          data: data.map((d) => d.totals.get(activityType)),
        };
      })
      .filter((dataset) => {
        return dataset.data.some((d) => d && d > 0);
      });

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
                display: !!this.scaleLabel,
                labelString: this.scaleLabel,
              },
            },
          ],
        },
      },
    };
  }

  ngOnInit(): void {
    if (!this.dataObs) {
      throw new TypeError('Must provide a FieldSummary[] dataObs.');
    }
    this.chartConfigurationObs = this.dataObs.pipe(
      map((data) => this.getConfig(data))
    );
  }
}
