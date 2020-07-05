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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FieldSummaryComponent } from './field-summary/field-summary.component';
import { StravaService } from './strava.service';
import { StravaHttpService } from './strava-http.service';
import { SummaryService } from './summary.service';
import { StravaMockService } from './strava-mock.service';
import { StravaAuthInterceptor } from './strava-auth.interceptor';
import { ClubComponent } from './club/club.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FieldSummaryComponent,
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
      provide: SummaryService,
      deps: [StravaService],
      useFactory: (stravaService: StravaService) => {
        return new SummaryService(stravaService);
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
