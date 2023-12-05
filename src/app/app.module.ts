import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { IntroComponent } from './intro/intro.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NuisanceReportComponent } from './nuisance-report/nuisance-report.component';
import { ReportListComponent } from './report-list/report-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './add-form/add-form.component';
import { LoadingComponent } from './loading/loading.component';
import { MoreInfoComponent } from './more-info/more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    IntroComponent,
    MainPageComponent,
    NuisanceReportComponent,
    ReportListComponent,
    AddFormComponent,
    LoadingComponent,
    MoreInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
