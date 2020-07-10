import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SummaryAthlete } from './strava';
import { catchError, retryWhen, delay, take, flatMap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable()
export class StravaAuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Only intercept Strava proxy requests.
    if (!request.url.startsWith(`${environment.strava_api_url}/proxy`)) {
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
      .get<SummaryAthlete>(`${environment.strava_api_url}/user`, {
        withCredentials: true,
      })
      .pipe(
        catchError((err) => {
          console.error(err);
          window.open(`${environment.strava_api_url}/login`);
          return httpClient
            .get<SummaryAthlete>(`${environment.strava_api_url}/user`, {
              withCredentials: true,
            })
            .pipe(retryWhen((errors) => errors.pipe(delay(1000), take(600))));
        })
      );
  }
}
