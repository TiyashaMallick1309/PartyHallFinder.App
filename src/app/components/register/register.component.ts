import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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
  
  initForms() {
    this.loginForm = this.fb.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registrationForm = this.fb.group({
      registrationEmail: ['', [Validators.required, Validators.email]],
      registrationPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  
  onRegistration() {
    const email = this.registrationForm.get('registrationEmail')?.value;
    const password = this.registrationForm.get('registrationPassword')?.value;
    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    const username = this.registrationForm.get('registrationUsername')?.value;
    const firstname = this.registrationForm.get('registrationFirstname')?.value;
    const lastname = this.registrationForm.get('registrationLastname')?.value;

    if (password !== confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match, please try again';
      return;
    }

    this.authService.signUp(this.selectedAccountType, email, password)
      .then(() => {
        // Show success message or redirect user to appropriate dashboard
      })
      .catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          this.registrationEmailError = 'Email already exists, please login or use a different email';
        } else {
          this.registrationEmailError = 'An error occurred, please try again later';
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
