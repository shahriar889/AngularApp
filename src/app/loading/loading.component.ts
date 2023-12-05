import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit{
  title = 'Loading';
  constructor(private router:Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/main']);
    }, 3000);
  }
}
