import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Owner } from 'src/app/models/owner';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-owner-login',
  templateUrl: './owner-login.component.html',
  styleUrls: ['./owner-login.component.css']
})
export class OwnerLoginComponent {
  selectedAccountType = 'owner';
  showLoginForm = false;
  loginActive = true;
  loginForm!: FormGroup;
  loginFailed = false;
  submitted = false; // add new property here
  data:Owner[]=[];
  ownerSubscription: Subscription | undefined;

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
    
    
    this.ownerSubscription = this.apiService.getOwners().subscribe({
      next: (owners: Owner[]) => {
        const owner = owners.find(o =>o.username == enteredUsername);
        if (owner && this.apiService.comparePasswords(enteredPassword, owner.password)) {
          // authentication successful
          console.log('Authentication successful');
          this.authService.signInOwner(owner.role);
              this.router.navigate(['/owner-dashboard']);
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
    if (this.ownerSubscription) {
      this.ownerSubscription.unsubscribe();
    }

  }
}


