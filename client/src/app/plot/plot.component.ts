import { Component, OnInit, Input } from '@angular/core';
import { PlotKind, plotKinds } from '../plot-kind';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css'],
})
export class PlotComponent implements OnInit {
  @Input() xAxis!: Array<number>;
  @Input() plotKind!: PlotKind;

  constructor() {}

  ngOnInit(): void {
    if (!Array.isArray(this.xAxis)) {
      throw new TypeError('Must specify an xAxis for Plot.');
    }
    if (!plotKinds.includes(this.plotKind)) {
      throw new TypeError(`Invalid plot kind: ${this.plotKind}`);
    }
  }
}
