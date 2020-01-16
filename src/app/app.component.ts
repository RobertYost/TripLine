import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tripline';
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {

  }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => {
      console.log(x);
      this.currentUser = x;
    });
  }

  logout() {
    this.authenticationService.logout();
  }
}
