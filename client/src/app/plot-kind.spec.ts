import { isPlotKind, assertPlotKind } from './plot-kind';

describe('PlotKind', () => {
  it('should show if is PlotKind', () => {
    expect(isPlotKind('BAR')).toBeTruthy();
    expect(isPlotKind('BAT')).toBeFalsy();
  });

  it('should assert if is PlotKind', () => {
    expect(() => assertPlotKind('BAR')).not.toThrowError();
    expect(() => assertPlotKind('BAT')).toThrowError();
  });
});
