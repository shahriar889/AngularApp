import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportServiceService } from '../report-service.service';
import { Subscription } from 'rxjs';
import { NuisanceReport } from '../nuisance-report/nuisance-report.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css'
})
export class MoreInfoComponent implements OnInit{
  hash = CryptoJS.MD5('BaggyJeans').toString()
  date:Date = this.activatedRoute.snapshot.params['time']
  rList:NuisanceReport[] = [];
  r!: NuisanceReport;
  reportSubscription: Subscription | undefined;
  constructor(private activatedRoute:ActivatedRoute, private rs:ReportServiceService, private router:Router){
  }
  ngOnInit(): void {
    this.fetchReports();
  }

  fetchReports(): void {
    this.reportSubscription = this.rs.getReports().subscribe({
      next: (data: any) => {
        let reportList:NuisanceReport[] = [];
        reportList = JSON.parse(data.data);
        console.log(reportList);
        this.rList = reportList;
        let report:NuisanceReport = reportList.find(x => x.date === this.date)!;
        this.r = report;
        
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }
    });
  }
  changeStatus(): void {
    const enteredPassword = prompt('Please enter the password:');
    let inputHash:string = CryptoJS.MD5(enteredPassword!).toString()
    if(inputHash === this.hash){
      const foundIndex = this.rList.findIndex(x => x.date === this.r.date);
      this.r.status = !this.r.status;
      if (foundIndex !== -1) {
        this.rList[foundIndex].status = !this.rList[foundIndex].status;
        this.r.status = !this.r.status;
        console.log(this.rList);
        this.rs.update(this.rList);
      } else {
        alert('Report not found');
      }

      
    }
    else{
      alert("Incorrect password")
    }
  }
  goBack(): void {
    this.router.navigate(['/main']);
  }
}
