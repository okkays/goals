import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
import { FlaskService } from './flask.service';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    EverestComponent,
    EverestSummaryComponent,
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
      provide: FlaskService,
      deps: [HttpClient],
      useFactory: (httpClient: HttpClient) => {
        return new FlaskService(httpClient);
      },
    },
    {
      provide: StravaService,
      deps: [HttpClient, FlaskService],
      useFactory: (httpClient: HttpClient, flaskService: FlaskService) => {
        return new StravaHttpService(httpClient, flaskService);
      },
    },
    {
      provide: ElevationService,
      deps: [StravaService],
      useFactory: (stravaService: StravaService) => {
        return new ElevationService(stravaService);
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
