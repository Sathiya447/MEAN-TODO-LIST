import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './Login.html',
})
export class LoginComponent {
  mEmail: string = '';
  mPassword: string = '';

  constructor(private router: Router) {}

  onLoginClick() {
    // After Successful API response redirect to dashboard
    this.router.navigate(['/dashboard']);
  }
}
