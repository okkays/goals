/** Types of graphs that can be displayed by the Plot component. */
export const plotKinds = ['BAR'] as const;
export type PlotKind = typeof plotKinds[number];

export function isPlotKind(candidate: string): candidate is PlotKind {
  return plotKinds.includes(candidate as PlotKind);
}

export function assertPlotKind(candidate: string): PlotKind {
  if (!isPlotKind(candidate)) {
    throw new TypeError(`Not a valid plot kind: ${candidate}`);
  }
  return candidate;
}
