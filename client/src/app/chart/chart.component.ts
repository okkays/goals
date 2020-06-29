import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';

Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = false;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements AfterViewInit {
  @Input() chartConfiguration!: ChartConfiguration;
  chart?: Chart;

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngAfterViewInit(): void {
    if (!this.canvas) {
      throw new TypeError("Canvas didn't load in time");
    }
    if (!this.chartConfiguration) {
      throw new TypeError('Must specify a chart configuration.');
    }
    const context = this.canvas.nativeElement.getContext('2d');
    this.chart = new Chart(context, this.chartConfiguration);
  }
}
