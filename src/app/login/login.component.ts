import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  openDialog(data: any): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        localStorage.setItem('token', JSON.stringify(result.token));
        localStorage.setItem('email', JSON.stringify(result.logged_user.email));
        localStorage.setItem('name', JSON.stringify(result.logged_user.name));
        this.router.navigate(['']);
      }
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      const {email,password} = this.loginForm.value
      this.userService.login(email, password).subscribe(
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
