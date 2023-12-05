
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ReportServiceService } from '../report-service.service';
import { NuisanceReport } from '../nuisance-report/nuisance-report.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map!: L.Map
  private reportList:NuisanceReport[] = []
  reportSubscription: Subscription | undefined;


  constructor(private rs:ReportServiceService){}

  ngOnInit(): void {
    this.fetchReports()

  }

  fetchReports(): void {
    console.log("fetching reports")
    this.reportSubscription = this.rs.getReports().subscribe({
      next: (data: any) => {
        this.reportList = JSON.parse(data.data);
        console.log(this.reportList);
        this.showMap();
        this.putLabels();
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }
    });
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  getLocationRepeat(x:string,p:NuisanceReport[]): number {
    let count = 0;
    console.log(p.length)
    for(let report of p){
      if(report.location.toLocaleLowerCase() == x.toLocaleLowerCase()){
        count++;
      }
    }
    return count;
  }

  putLabels() {
    
    for(let report of this.reportList){
      let n:number = this.getLocationRepeat(report.location,this.reportList);
      let lat = report.latitude;
      let lon = report.longitude;
      console.log(n);
      let marker = L.marker([lon, lat]).addTo(this.map);
      marker.bindPopup(`<b>${report.location}</b><br>Number of reports: ${n}`);
    }

  }
}




