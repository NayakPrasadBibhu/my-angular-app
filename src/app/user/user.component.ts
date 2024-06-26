import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService,
    private router: Router 
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe(
      response => {
        this.user = response;
      },
      error => {
        console.error('Failed to fetch user details', error);
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(
      response => {
        console.log('Logout successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
}