import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  selectedAccountType = 'admin';
  showLoginForm = false;
  loginActive = true;
  loginForm!: FormGroup;
  loginFailed = false;
  submitted = false;
  admin: Admin[] = [{
    userName: 'Admin01',
    firstName: 'Tiyasha',
    lastName: 'Mallick',
    email: 'tiyasha.mallick@chubb.com',
    password: 'Qwerty@123',
    role: 'admin',
    phonenumber: '7980976206'
  }];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      loginUsername: ['', Validators.required],
      loginEmail: ['', Validators.required],
      loginPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)]]
    });
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const enteredUsername = this.loginForm.value.loginUsername;
    const enteredPassword = this.loginForm.value.loginPassword;

    const admin = this.admin.find(a => a.userName === enteredUsername && a.password === enteredPassword);

    if (admin) {
      // authentication successful
      console.log('Authentication successful');
      this.router.navigate(['admin-dashboard']);
    } else {
      // authentication failed
      console.log('Authentication Failed');
      this.loginFailed = true;
      this.loginForm.reset();
    }
  }
}