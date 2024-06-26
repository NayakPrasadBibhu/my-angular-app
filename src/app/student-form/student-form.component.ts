// student-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup ;
  id:any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: [''],
      email: [''],
      date_of_birth: [''],
      address: [''],
      phone_number: [''],
      // file_upload: [null]
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.authService.getStudent(this.id).subscribe(
        data => {
          this.studentForm.patchValue(data);
        },
        error => {
          console.error('Error fetching student', error);
        }
      );
    }
  }


  onSubmit(): void {
    if (this.id) {
      this.authService.updateStudent(this.id, this.studentForm.value).subscribe(
        () => {
          this.router.navigate(['/student-list']);
        },
        error => {
          console.error('Error updating student', error);
        }
      );
    } else {
      this.authService.addStudent(this.studentForm.value).subscribe(
        () => {
          this.router.navigate(['/student-list']);
        },
        error => {
          console.error('Error adding student', error);
        }
      );
    }
  }


}
