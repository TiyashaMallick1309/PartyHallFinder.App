import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  accountTypes = ['user', 'owner', 'admin'];
  selectedAccountType = 'user';
  registrationForm!: FormGroup;
  registrationFailed = false;
  submitted = false;
  
  constructor(private authService: AuthorizationService, private fb: FormBuilder, private router: Router) { 
    this.createRegistrationForm();
  }  
  
  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordMatch: true };
  }

  async onRegistration() {
    this.submitted = true; // set the property to true when the form is submitted
  
    if (this.registrationForm.invalid) {
      return;
    }
  
    const email = this.registrationForm.get('email')?.value;
    const password = this.registrationForm.get('password')?.value;
    const username = this.registrationForm.get('username')?.value;
    const firstname = this.registrationForm.get('firstname')?.value;
    const lastname = this.registrationForm.get('lastname')?.value;
  
    try {
      const success = await this.authService.signUp(
        this.selectedAccountType,
        email,
        password,
        username,
        firstname,
        lastname
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
        this.registrationFailed = true;
      }
    } catch (error: any) {
      console.error('REGISTRATION ERROR:', error);
      this.registrationFailed = true;
    }
  }
}