import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PROXY, ROOT } from './strava-http.service';
import { SummaryAthlete } from './strava';
import { catchError, retryWhen, delay, take, flatMap } from 'rxjs/operators';

@Injectable()
export class StravaAuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Only intercept Strava proxy requests.
    if (!request.url.startsWith(PROXY)) {
      return next.handle(request);
    }

    return this.checkAuth().pipe(
      flatMap(() => {
        return next.handle(request.clone({ withCredentials: true }));
      })
    );
  }

  private checkAuth(): Observable<SummaryAthlete> {
    // Inject the client to avoid a circular injection.
    const httpClient = this.injector.get(HttpClient);
    return httpClient
      .get<SummaryAthlete>(`${ROOT}/user`, { withCredentials: true })
      .pipe(
        catchError((err) => {
          console.error(err);
          window.open(`${ROOT}/login`);
          return httpClient
            .get<SummaryAthlete>(`${ROOT}/user`, { withCredentials: true })
            .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(600))));
        })
      );
  }
}
