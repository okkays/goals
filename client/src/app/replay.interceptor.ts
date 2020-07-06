import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { PROXY } from './api-util';

@Injectable()
export class ReplayInterceptor implements HttpInterceptor {
  private readonly replays = new Map<string, Observable<HttpEvent<unknown>>>();

  private hashRequest(request: HttpRequest<unknown>) {
    return request.urlWithParams;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Only intercept Strava proxy requests.
    if (!request.url.startsWith(PROXY)) {
      return next.handle(request);
    }
    // Only intercept GET requests (we shouldn't cache change requests).
    if (request.method !== 'GET') {
      return next.handle(request);
    }
    const hash = this.hashRequest(request);
    const existingReplay = this.replays.get(hash);
    if (existingReplay) {
      return existingReplay;
    }
    const newReplay = next.handle(request).pipe(shareReplay(1));
    this.replays.set(hash, newReplay);
    return newReplay;
  }
}
