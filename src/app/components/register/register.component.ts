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
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    console.log(password, confirmPassword);

    return password === confirmPassword ? null : { passwordMatch: true };
  }

  async onRegistration() {
    this.submitted = true; // set the property to true when the form is submitted
    if (this.registrationForm.errors !== null) {
      return;
    }

    const userData: User = {
      id: this.registrationForm.get('username')?.value,
      userName: this.registrationForm.get('username')?.value,
      firstname: this.registrationForm.get('firstname')?.value,
      lastname: this.registrationForm.get('lastname')?.value,
      address: {
        street: this.registrationForm.get('address.street')?.value,
        city: this.registrationForm.get('address.city')?.value,
        state: this.registrationForm.get('address.state')?.value,
        country: this.registrationForm.get('address.country')?.value,
        postalcode: this.registrationForm.get('address.postalcode')?.value,
      },
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      role: this.registrationForm.get('role')?.value,
      phonenumber: this.registrationForm.get('phonenumber')?.value,
    };

    try {
      this.apiService.addUser(userData).subscribe(response => {
        console.log(response);
      });

      const success = await this.authService.signUp(
        this.selectedAccountType,
        userData.email,
        userData.password,
        userData.firstname,
        userData.lastname,
        userData.role
      );

      if (success) {
        window.location.reload();
        console.log("Registration successful!")
      } else {
        this.registrationFailed = true;
      }
    } catch (error: any) {
      console.error('REGISTRATION ERROR:', error);
      this.registrationFailed = true;
    }
  }
}