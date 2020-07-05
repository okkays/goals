import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { EverestComponent } from './everest/everest.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { EverestSummaryComponent } from './everest-summary/everest-summary.component';
import { StravaService } from './strava.service';
import { StravaHttpService } from './strava-http.service';
import { ElevationService } from './elevation.service';
import { StravaMockService } from './strava-mock.service';
import { StravaAuthInterceptor } from './strava-auth.interceptor';
import { ClubComponent } from './club/club.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    EverestComponent,
    EverestSummaryComponent,
    ClubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: StravaService,
      deps: [HttpClient],
      useFactory: (httpClient: HttpClient) => {
        return new StravaHttpService(httpClient);
      },
    },
    {
      provide: ElevationService,
      deps: [StravaService],
      useFactory: (stravaService: StravaService) => {
        return new ElevationService(stravaService);
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StravaAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
