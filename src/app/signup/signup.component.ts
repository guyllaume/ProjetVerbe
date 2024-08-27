import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { VerbService } from '../services/verb.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const {email,name,password} = this.signupForm.value
      this.userService.signup(email,name, password).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
