export type PropertyOfType<T, R> = {
  [K in keyof T]: T[K] extends R ? K : never;
}[keyof T];
