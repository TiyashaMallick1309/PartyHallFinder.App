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

  async onRegistration() {
    this.submitted = true; // set the property to true when the form is submitted
  
    if (this.registrationForm.invalid) {
      return;
    }
  
    const ownerData: Owner = {
      id: this.registrationForm.get('id')?.value,
      username: this.registrationForm.get('username')?.value,
      firstname: this.registrationForm.get('firstname')?.value,
      lastname: this.registrationForm.get('lastname')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      role: this.registrationForm.get('role')?.value,
      phonenumber: this.registrationForm.get('phonenumber')?.value,
      ownedHall:this.registrationForm.get('ownedHall')?.value,
    };
  
    try {
      this.apiService.addOwner(ownerData).subscribe(response => {
        console.log(response);
      });
      
      const success = await this.authService.signUp(
        this.selectedAccountType,
        ownerData.email,
        ownerData.password,
        ownerData.firstname,
        ownerData.lastname,
        ownerData.role
      );
  
      if (success) {
            this.router.navigate(['/owner-dashboard']);
        }
       else {
        this.registrationFailed = true;
      }
    } catch (error: any) {
      console.error('REGISTRATION ERROR:', error);
      this.registrationFailed = true;
    }
  }
}