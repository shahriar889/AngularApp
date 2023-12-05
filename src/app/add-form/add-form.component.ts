import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NuisanceReport } from '../nuisance-report/nuisance-report.component';
import { ReportServiceService } from '../report-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {
  title = 'Create Nuisance Report';
  m = new Map<string, lonLat>();
  reportList: NuisanceReport[] = [];
  reportSubscription: Subscription | undefined;
  reportForm!: FormGroup;
  suggestedLocations: string[] = [];
  showDropdown = false;

  constructor(private rs: ReportServiceService) {}

  ngOnInit(): void {
    this.fetchReports();
    this.reportForm = new FormGroup({
      baddie: new FormControl('', Validators.required),
      reportedBy: new FormControl('', Validators.required),
      phnNo: new FormControl('', Validators.required),
      extraInfo: new FormControl('', Validators.required),
      imgURL: new FormControl('', Validators.required),
      location: new FormControl('', [Validators.required,Validators.minLength(3)]),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required)
    });
  }

  fetchReports(): void {
    this.reportSubscription = this.rs.getReports().subscribe({
      next: (data: any) => {
        this.reportList = JSON.parse(data.data);
        this.m = this.getLoactionMap();
        console.log(this.m);
        console.log(this.reportList);
      },
      error: (error) => {
        console.error('Error fetching reports:', error);
      }
    });
  }

  getLoactionMap(): Map<string, lonLat> {
    let map = new Map<string, lonLat>();
    for (let report of this.reportList) {
      map.set(report.location, new lonLat(report.longitude, report.latitude));
    }
    return map;
  }

  onLocationInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const location = inputElement.value.toLocaleLowerCase();
    const uniqueLocations = new Set<string>(
      this.reportList.map(report => report.location.toLocaleLowerCase())
                    .filter(loc => loc.includes(location))
    );
  
    this.suggestedLocations = [...uniqueLocations];
    this.showDropdown = this.suggestedLocations.length > 0;
  }

  onLocationSelected(location: string): void {
    this.reportForm.patchValue({ location });
    const selectedReport = this.reportList.find(report => report.location.toLowerCase() === location.toLowerCase());
    if (selectedReport) {
      this.reportForm.patchValue({
        longitude: selectedReport.longitude,
        latitude: selectedReport.latitude
      });
    }
    this.showDropdown = false;
  }
  

  onSubmit(): void {
    const x:string = this.reportForm.value.reportedBy+ " "+this.reportForm.value.phnNo.toString();
    const report = new NuisanceReport(
      this.reportForm.value.location,
      this.reportForm.value.baddie,
      x,
      this.reportForm.value.extraInfo,
      this.reportForm.value.longitude,
      this.reportForm.value.latitude,
      this.reportForm.value.imgURL
    );
    this.rs.addReport(report);
  }
}

class lonLat {
  longitude: number;
  latitude: number;

  constructor(longitude: number, latitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
