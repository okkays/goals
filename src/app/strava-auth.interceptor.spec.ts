import { TestBed } from '@angular/core/testing';

import { StravaAuthInterceptor } from './strava-auth.interceptor';

describe('StravaAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      StravaAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: StravaAuthInterceptor = TestBed.inject(StravaAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
