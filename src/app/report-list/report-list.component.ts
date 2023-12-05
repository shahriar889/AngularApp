import { Component, OnInit } from '@angular/core';
import { NuisanceReport } from '../nuisance-report/nuisance-report.component';
import { ReportServiceService } from '../report-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';



@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent implements OnInit{
  hash = CryptoJS.MD5('BaggyJeans').toString()
  title = 'Report List';
  reportList: NuisanceReport[] =[];
  reportSubscription: Subscription | undefined;

  constructor(private rs:ReportServiceService, private router:Router) {
  }

  ngOnInit(): void {
    this.fetchReports();
  }

  deleteRep(date: Date): void {
    console.log("delete from list")
    const enteredPassword = prompt('Please enter the password:');
    let inputHash:string = CryptoJS.MD5(enteredPassword!).toString()
    if(inputHash === this.hash){
      this.rs.deleteReport(date);
    }
    else{
      alert("Incorrect password")
    }
   
  }

  fetchReports(): void {
    this.reportSubscription = this.rs.getReports().subscribe({
      next: (data: any) => {
        this.reportList = JSON.parse(data.data);
        console.log(this.reportList);
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }
    });
  }

  sortReports(x:string): void {
    if(x === 'location'){
      this.reportList.sort((a,b) => (a.location.toLocaleLowerCase() > b.location.toLocaleLowerCase()) ? 1 : -1);
    }
    else if(x === 'date'){
      this.reportList.sort((a,b) => (a.date > b.date) ? 1 : -1);
    }
    else if(x === 'status'){
      this.reportList.sort((a,b) => (a.status > b.status) ? 1 : -1);
    }
    else {
      this.reportList.sort((a,b) => (a.bad.toLocaleLowerCase() > b.bad.toLocaleLowerCase()) ? 1 : -1);
    }
  }

  navTOForm(){
    this.router.navigate(['/add']);
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    this.reportSubscription?.unsubscribe();
  }
}
