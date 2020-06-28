import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() chartConfiguration!: ChartConfiguration;
  chart: Chart;

  constructor() {}

  ngOnInit(): void {
    if (!this.chartConfiguration) {
      throw new TypeError('Must specify a chart configuration.');
    }
    this.chart = new Chart('canvas', this.chartConfiguration);
  }
}
