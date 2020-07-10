import { HttpParams } from '@angular/common/http';

/** Converts a query object to an HttpParams. */
export function toParams(query?: Record<string, unknown | unknown[]>) {
  if (!query) {
    return new HttpParams();
  }
  return Object.entries(query).reduce(
    (httpParams: HttpParams, [key, value]) => {
      if (Array.isArray(value)) {
        for (const subValue of value) {
          httpParams = httpParams.append(key, subValue);
        }
        return httpParams;
      }
      return httpParams.set(key, String(value));
    },
    new HttpParams()
  );
}
