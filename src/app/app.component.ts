import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isAuthenticated: boolean;
  isAdmin: boolean;
  title = 'FlightTicketFrontend';

  constructor(){
    this.isAuthenticated = false;
    this.isAdmin = false;
  }

}
