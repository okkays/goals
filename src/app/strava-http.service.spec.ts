import { TestBed } from '@angular/core/testing';

import { StravaHttpService } from './strava-http.service';

describe('StravaHttpService', () => {
  let service: StravaHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StravaHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
