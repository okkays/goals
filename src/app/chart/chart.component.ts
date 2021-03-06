import {
  Component,
  AfterViewInit,
  OnChanges,
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
export class ChartComponent implements AfterViewInit, OnChanges {
  @Input() chartConfiguration!: ChartConfiguration;
  chart?: Chart;

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngOnChanges() {
    if (!this.canvas) {
      return;
    }
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new TypeError("Couldn't get the canvas context");
    }
    this.chart = new Chart(context, this.chartConfiguration);
  }

  ngAfterViewInit(): void {
    if (!this.canvas) {
      throw new TypeError("Canvas didn't load in time");
    }
    if (!this.chartConfiguration) {
      throw new TypeError('Must specify a chart configuration.');
    }
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new TypeError("Couldn't get the canvas context");
    }
    this.chart = new Chart(context, this.chartConfiguration);
  }
}
