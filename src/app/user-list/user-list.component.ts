import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = [];

  constructor(private userService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        response => {
          console.log('User deleted successfully', response);
          this.loadUsers();
        },
        error => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  editUser(id: number): void {
    this.router.navigateByUrl(`/add-user/${id}`);
  }
}
