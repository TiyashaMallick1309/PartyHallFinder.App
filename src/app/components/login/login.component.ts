import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selectedAccountType = 'user';
  showLoginForm = false;
  loginActive = true;
  loginForm!: FormGroup;
  loginFailed = false;
  submitted = false; // add new property here

  constructor(
    private authService: AuthorizationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.submitted = false; // set the property to false in ngOnInit
  }

  selectAccountType(event: Event) {
    this.selectedAccountType = (event.target as HTMLSelectElement).value;
    this.showLoginForm = true;
    this.loginFailed = false;
    this.loginForm.reset();
    this.submitted = false; // reset the property when selecting a new account type
  }

  async onLogin() {
    this.submitted = true; // set the property to true when the form is submitted

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('loginEmail')?.value;
    const password = this.loginForm.get('loginPassword')?.value;

    try {
      const success = await this.authService.signIn(
        this.selectedAccountType,
        email,
        password
      );

      if (success) {
        switch (this.selectedAccountType) {
          case 'user':
            this.router.navigate(['user-dashboard/party-hall-list']);
            break;
          case 'owner':
            this.router.navigate(['/owner-dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
        }
      } else {
        this.loginFailed = true;
      }
    } catch (error: any) {
      console.error('LOGIN ERROR:', error);
      this.loginFailed = true;
    }
  }
}