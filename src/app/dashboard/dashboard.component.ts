// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userEmail: string | null = null;
  userToken: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve user email and token from localStorage
    this.userEmail = localStorage.getItem('userEmail');
    this.userToken = localStorage.getItem('token');

    if (!this.userToken) {
      // Redirect to login if the token doesn't exist
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    // Clear localStorage and redirect to login
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
