import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

// interface Student {
//   id: number;
//   name: string;
//   // Add other properties as needed
// }

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any;
  // student: any;
  // students: Student[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getStudents().subscribe(
      data => {
        this.students = data;
        console.log(this.students.length);
      },
      error => {
        console.error('Error fetching students', error);
      }
    );
  }

  deleteStudent(id: number): void {
    this.authService.deleteStudent(id).subscribe(
      () => {
        this.students = this.students.filter((student: { id: number; }) => student.id !== id);
      },
      error => {
        console.error('Error deleting student', error);
      }
    );
  }
  editStudent(id: number): void {
    this.router.navigateByUrl(`/student-form/${id}`);
  }
}
