import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mUserName: string = 'Sathiya';
  mLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((value) => {
      if (router.url === '/dashboard') {
        this.mLoggedIn = true;
      } else {
        this.mLoggedIn = false;
      }
    });
  }

  logOut() {
    // API Call
    this.router.navigate(['/login']);
  }
}
