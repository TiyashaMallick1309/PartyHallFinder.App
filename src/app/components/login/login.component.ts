import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Subscription } from 'rxjs';
import { PasswordHashService } from 'src/app/services/password-hash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  selectedAccountType = 'user';
  showLoginForm = false;
  loginActive = true;
  loginForm!: FormGroup;
  loginFailed = false;
  submitted = false; // add new property here

  userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthorizationService,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      loginUsername: ['', Validators.required],
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)]]
    });
    this.submitted = false; // set the property to false in ngOnInit
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const enteredUsername = this.loginForm.value.loginUsername;
    const enteredPassword = this.loginForm.value.loginPassword;

    console.log('inside login onsubmit');
    console.log(enteredUsername);
    console.log(enteredPassword);
    

    this.userSubscription = this.apiService.getAllUsers().subscribe({
      next: (users: User[]) => {
        const user = users.find(u => u.username === enteredUsername);
        
        if (user && this.apiService.comparePasswords(enteredPassword, user.password)) {
          // authentication successful
          console.log('Authentication successful');
          this.authService.signIn(user.role);
    
          switch (user.role) {
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
          // authentication failed
          console.log('Authentication Failed');
          this.loginFailed = true;
          this.loginForm.reset();
        }
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

  }
}

