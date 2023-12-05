import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { timer } from 'rxjs';


@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
  animations: [
    trigger('fadeIn1', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-40vh)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0vh)' })), 
      ]),
    ]),
    trigger('fadeIn2', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-40vh)' }),
        animate('500ms 200ms ease-out', style({ opacity: 1, transform: 'translateY(0vh)' })),
      ]),
    ]),    
  ],
})
export class IntroComponent implements OnInit{
  prompt1: string = 'Welcome To Night Crusade Titans';
  prompt2: string = 'Nuisance Reporting App';
  

  constructor(private router:Router) { }

  ngOnInit(): void {
    timer(5000).subscribe(() => {
      this.router.navigate(['/main']);
    });
  }
}
