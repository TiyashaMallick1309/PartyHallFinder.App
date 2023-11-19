import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Owner } from 'src/app/models/owner';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-owner-register',
  templateUrl: './owner-register.component.html',
  styleUrls: ['./owner-register.component.css']
})
export class OwnerRegisterComponent {
  registrationForm!: FormGroup;
  registrationFailed = false;
  submitted = false;
  selectedAccountType = 'owner';
  
  constructor(private authService: AuthorizationService, private fb: FormBuilder, private router: Router, private apiService: ApiService) { }
  
  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]],
      confirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalcode: ['', Validators.required],
      }),
      phonenumber: ['', [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/)]],
      role: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordMatch: true };
  }

  onRegistration() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const ownerData = this.registrationForm.value;
      this.apiService.addUser(ownerData).subscribe({
        next: response => {
          console.log('Registration successful!');
          window.location.reload();
        },
        error: error => {
          console.error(error);
          this.registrationFailed = true;
        }
      });
    }
  }
}