import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightComponent } from './components/flight/flight.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { AvailableTicketsByFlightComponent } from './components/available-tickets-by-flight/available-tickets-by-flight.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { FilterComponent } from './components/flight/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignUpComponent,
    FlightComponent,
    AvailableTicketsByFlightComponent,
    MyTicketsComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthServiceService,
    HttpClient,
    CdkColumnDef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
