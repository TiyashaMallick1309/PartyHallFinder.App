import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Subscription } from 'rxjs';
import { SlotService } from 'src/app/services/slot.service';

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
  data: User[] = [];
  userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthorizationService,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private slotService: SlotService
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


    this.userSubscription = this.apiService.getUsers().subscribe({
      next: (users: User[]) => {
        const user = users.find(u => u.userName == enteredUsername);
        if (user && this.apiService.comparePasswords(enteredPassword, user.password)) {
          // authentication successful
          console.log('Authentication successful');
          console.log(user)
          this.authService.signInUser(user);
          // Call a method of the SlotService and pass the userId
          this.router.navigate(['user-dashboard/party-hall-list']);
          console.log(user.id + " hey")
          this.slotService.setUserId(user.id);
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

