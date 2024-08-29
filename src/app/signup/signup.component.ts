import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(SignupDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.router.navigate(['/login']);
      }
    });
  }
  onSignup() {
    if (this.signupForm.valid) {
      const {email,name,password} = this.signupForm.value
      this.userService.signup(email,name, password).subscribe(
        (res) => {
          this.openDialog(res);
        },
        (err) => {
          this.openDialog(err);
        }
      );
    }
  }

}
