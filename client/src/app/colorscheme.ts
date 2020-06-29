import { ChartDataSets } from 'chart.js';
import * as _ from 'underscore';

/** Stolen from https://material.angularjs.org/1.1.0/demo/colors */
export const chartColors = {
  primary: '#8BC34A',
  accent: '#40C4FF',
  warn: '#F44336',
  colors: {
    red: '#F44336',
    pink: '#E91E63',
    purple: '#9C27B0',
    deepPurple: '#673AB7',
    indigo: '#3F51B5',
    blue: '#2196F3',
    lightBlue: '#03A9F4',
    cyan: '#00BCD4',
    teal: '#009688',
    green: '#4CAF50',
    lightGreen: '#8BC34A',
    lime: '#CDDC39',
    yellow: '#FFEB3B',
    amber: '#FFC107',
    orange: '#FF9800',
    deepOrange: '#FF5722',
    brown: '#795548',
    grey: '#9E9E9E',
    blueGrey: '#607D8B',
  },
};

export function colorizeDatasets(datasets: ChartDataSets[]) {
  const colorSource = _.sample(chartColors.colors, datasets.length);
  for (const [index, dataset] of Object.entries(datasets)) {
    dataset.backgroundColor = colorSource[index];
  }
}
