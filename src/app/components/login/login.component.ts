import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { Owner } from 'src/app/models/owner';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthorizationService } from 'src/app/services/authorization.service';

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
  submitted = false;
  userSubscription: Subscription | undefined;
  ownerSubscription: Subscription | undefined;
  admin: Admin[] = [{
    userName: 'Admin01',
    firstName: 'Tiyasha',
    lastName: 'Mallick',
    email: 'tiyasha.mallick@chubb.com',
    password: 'Qwerty@123',
    role: 'admin',
    phonenumber: '7980976206'
  }];

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
    this.submitted = false;
  }

  onLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const enteredUsername = this.loginForm.value.loginUsername;
    const enteredPassword = this.loginForm.value.loginPassword;

      // search in user data
      this.userSubscription = this.apiService.getUsers().subscribe({
        next: (users: User[]) => {
          const user = users.find(u => u.userName == enteredUsername);
          if (user && this.apiService.comparePasswords(enteredPassword, user.password)) {
            // authentication successful as a user
            console.log('User authentication successful');
            console.log(user);
            this.authService.signInUser(user);
            localStorage.setItem('isLoggedIn', 'true');
            this.router.navigate(['user-dashboard/party-hall-list']);
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log('User data stored in local storage', JSON.stringify(user));
            return;
          } else {
            console.log('User Authentication Failed');
            // search in owner data
            this.ownerSubscription = this.apiService.getOwners().subscribe({
              next: (owners: Owner[]) => {
                const owner = owners.find(o => o.username == enteredUsername);
                if (owner && this.apiService.comparePasswords(enteredPassword, owner.password)) {
                  // authentication successful as an owner
                  console.log('Owner authentication successful');
                  this.authService.signInOwner(owner.role, owner);
                  localStorage.setItem('isLoggedIn', 'true');
                  this.router.navigate(['owner-dashboard']);
                  console.log('Owner data stored in local storage', JSON.stringify(owner));
                  localStorage.setItem('currentOwner', JSON.stringify(owner));
                  return;
                } else {
                  console.log('Owner Authentication Failed');
                  this.loginFailed = true;
                  this.loginForm.reset();
                }
              },
              error: (error: any) => {
                console.error(error);
              }
            });
          }
        },
        error: (error: any) => {
          console.error(error);
        }
      });
      const admin = this.admin[0];
      console.log(this.admin[0])
      if (admin && admin.userName == enteredUsername && admin.password == enteredPassword) {
        // authentication successful
        console.log('Authentication successful');
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['admin-dashboard']);
      } else {
        // authentication failed
        console.log('Authentication Failed');
        this.loginFailed = true;
        this.loginForm.reset();
      }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.ownerSubscription) {
      this.ownerSubscription.unsubscribe();
    }
  }
}