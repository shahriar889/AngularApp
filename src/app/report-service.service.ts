import { Injectable, OnInit } from '@angular/core';
import { NuisanceReport } from './nuisance-report/nuisance-report.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService implements OnInit{
  reportList: NuisanceReport[] =[];
  reportSubscription: Subscription | undefined;
  constructor(private http: HttpClient, private router: Router) {
    this.http.get('https://272.selfip.net/apps/3dXiFeQMVi/collections/reports/documents/value').subscribe((data:any)=>{
      this.reportList = JSON.parse(data.data);
    })
   }

  ngOnInit(): void {
    
  }

  getReports1(): NuisanceReport[] {
    return this.reportList;
  }

  getReports(): Observable<NuisanceReport[]> {
    return this.http.get<NuisanceReport[]>('https://272.selfip.net/apps/3dXiFeQMVi/collections/reports/documents/value');
  }
  addReport(report:NuisanceReport): void {
    console.log(this.reportList);
    this.reportList.push(report);
    this.http.put('https://272.selfip.net/apps/3dXiFeQMVi/collections/reports/documents/value/',{
      "key": "value",
      "data":JSON.stringify(this.reportList)
    }).subscribe(
      (data:any)=>{
        console.log(data);
        this.reportList = JSON.parse(data.data);
        this.router.navigate(['/main']);

    })
  }
  deleteReport(date: Date): void {
    console.log(this.reportList)
    this.reportList = this.reportList.filter((report) => report.date !== date);
    this.http.put('https://272.selfip.net/apps/3dXiFeQMVi/collections/reports/documents/value/',{
      "key": "value",
      "data":JSON.stringify(this.reportList)
    }).subscribe(
      (data:any)=>{
        console.log(data);
        this.router.navigate(['/loading']);
    })
  }
  update(x:NuisanceReport[]){
    this.http.put('https://272.selfip.net/apps/3dXiFeQMVi/collections/reports/documents/value/',{
      "key": "value",
      "data":JSON.stringify(x)
    }).subscribe(
      (data:any)=>{
        console.log(data);
        this.reportList = JSON.parse(data.data);

    })
  }
}


