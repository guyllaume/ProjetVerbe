import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) { }

  goToFavoriteList(){
    this.router.navigate(['favorite-list']);
  }
  goToDaily(){
    this.router.navigate(['daily']);
  }
  goToJourney(){
    this.router.navigate(['journey']);
  }
}
