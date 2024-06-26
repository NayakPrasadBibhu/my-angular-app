import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  registerForm: FormGroup;
  hidePassword = true;
  id: any=0;
  isEditMode: boolean = false; 
  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router,private route:ActivatedRoute 
  ) {
    this.registerForm = this.fb.group({
      name:['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required, Validators.minLength(6)]]
    });
    
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
       this.isEditMode = true;
      this.authService.getUs(this.id).subscribe(
        data => {
          this.registerForm.patchValue(data);
        },
        error => {
          console.error('Error fetching user', error);
        }
      );
    }

  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  onSubmit() {
    if (this.registerForm.valid && this.id==0||this.id==undefined) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('User Created successfully!', response);
          this.router.navigate(['/user-list']);

        },
        error => {
          console.error('User Created failed', error);
        }
      );
    }
    else{
      this.authService.updateUser(this.id,this.registerForm.value).subscribe(
        response => {
          console.log('User Updated successfully!', response);
          this.router.navigate(['/user-list']);

        },
        error => {
          console.error('User Created failed', error);
        }
      ); 
    }
  }
  

}
