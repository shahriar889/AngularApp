import { Component, Input, OnInit } from '@angular/core';
import { ReportServiceService } from '../report-service.service';

@Component({
  selector: 'app-nuisance-report',
  templateUrl: './nuisance-report.component.html',
  styleUrl: './nuisance-report.component.css'
})
export class NuisanceReportComponent implements OnInit{
  title = 'Nuisance Report';
  @Input() report!: NuisanceReport;

  constructor(private rs: ReportServiceService) {
  }

  ngOnInit(): void {
    
    
  }
  
}

export class NuisanceReport {
  date: Date;
  location: string;
  bad: string;
  reportedBy: string;
  status:boolean;
  extraInfo: string;
  longitude: number;
  latitude: number;
  imgURL: string;

  constructor(location: string, bad: string, reportedBy: string, extraInfo: string, longitude: number, latitude: number, imgURL: string) {
    this.date = new Date();
    this.location = location;
    this.bad = bad;
    this.reportedBy = reportedBy;
    this.status = false;
    this.extraInfo = extraInfo;
    this.longitude = longitude;
    this.latitude = latitude;
    this.imgURL = imgURL;
  }

}