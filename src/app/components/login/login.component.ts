import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  selectedAccountType = 'user';
  showLoginForm = false;
  loginActive = true;
  registrationActive = false;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  loginEmailError = '';
  loginPasswordError = '';
  registrationEmailError = '';
  registrationPasswordError = '';
  confirmPasswordError = '';
  loginEmail!: string;
  loginPassword!: string;
  registrationEmail!: string;
  registrationPassword!: string;
  confirmPassword!: string;
  registrationUsername!:string;
  registrationFirstname!:string;
  registrationLastname!:string;

  constructor(private authService: AuthorizationService, private fb: FormBuilder, private router: Router) { }


  onLogin() {
    const email = this.loginForm.get('loginEmail')?.value;
    const password = this.loginForm.get('loginPassword')?.value;

    this.authService.signIn(this.selectedAccountType, email, password)
      .then(() => {
        // Redirect user to appropriate dashboard
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.loginEmailError = 'Account Not Found, please register first';
            break;
          case 'auth/wrong-password':
            this.loginPasswordError = 'Incorrect Password, please try again';
            break;
          default:
            this.loginEmailError = 'An error occurred, please try again later';
          // Handle other errors
        }
      });
    // Redirect to the respective dashboard
    if (this.selectedAccountType === 'user') {
      this.router.navigate(['user-dashboard/party-hall-list']);
    } else if (this.selectedAccountType === 'owner') {
      this.router.navigate(['/owner-dashboard']);
    } else if (this.selectedAccountType === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    }
  }

}
