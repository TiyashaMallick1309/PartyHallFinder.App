import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedAccountType = 'user';

  registrationForm!: FormGroup;
  registrationFailed = false;
  submitted = false;

  constructor(private authService: AuthorizationService, private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)]],
      confirmPassword: ['', Validators.required],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
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
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    console.log(password, confirmPassword);

    return password === confirmPassword ? null : { passwordMatch: true };
  }

  onRegistration() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.apiService.addUser(userData).subscribe({
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