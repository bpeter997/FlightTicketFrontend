import { AddFlightComponent } from './components/flight/add-flight/add-flight.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { AvailableTicketsByFlightComponent } from './components/available-tickets-by-flight/available-tickets-by-flight.component';
import { AuthGuard } from './guards/auth.guard';
import { FlightComponent } from './components/flight/flight.component';
import { SignUpComponent } from './components/signup/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'flights', component: FlightComponent, canActivate: [AuthGuard] },
  { path: 'tickets', component: AvailableTicketsByFlightComponent, canActivate: [AuthGuard] },
  { path: 'mytickets', component: MyTicketsComponent, canActivate: [AuthGuard] },
  { path: 'addFlight', component: AddFlightComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
