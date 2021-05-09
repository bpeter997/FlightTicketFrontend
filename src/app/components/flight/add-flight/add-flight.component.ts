import { Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { CreateTicketTemplate } from './../../../interfaces/createTicketTemplate.';
import { FlightService } from 'src/app/services/flight/flight.service';
import { CreateFlightTemplate } from './../../../interfaces/createFlightTemplate';
import { AirlineService } from "./../../../services/airline/airline.service";
import { AirplaneService } from "./../../../services/airplane/airplane.service";
import { AirportService } from "./../../../services/airport/airport.service";
import { AirportTemplate } from "./../../../interfaces/airportTemplate";
import { AirlineTemplate } from "./../../../interfaces/airlineTemplate";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AirplaneTemplate } from "src/app/interfaces/airplaneTemplate";

@Component({
  selector: "app-add-flight",
  templateUrl: "./add-flight.component.html",
  styleUrls: ["./add-flight.component.sass"],
})
export class AddFlightComponent implements OnInit {
  airlines: Array<AirlineTemplate>;
  airplanes: Array<AirplaneTemplate>;
  airports: Array<AirportTemplate>;

  flightFormGroup: FormGroup;

  constructor(
    private router: Router,
    private airportService: AirportService,
    private airlineService: AirlineService,
    private airplaneService: AirplaneService,
    private flightService: FlightService,
    private ticketService: TicketService 
  ) {
    this.airlines = [];
    this.airplanes = [];
    this.airports = [];
    this.flightFormGroup = new FormGroup({
      start: new FormControl("", Validators.required),
      arrive: new FormControl("", Validators.required),
      startHour: new FormControl("", Validators.required),
      arriveHour: new FormControl("", Validators.required),
      from: new FormControl("", Validators.required),
      to: new FormControl("", Validators.required),
      airline: new FormControl("", Validators.required),
      airplane: new FormControl("", Validators.required),
      ticketPrice: new FormControl("", Validators.required),
    });
  }

  getAllAirports() {
    this.airportService.getAllAirports([]).subscribe((data) => {
      this.airports = [];
      for (let i = 0; i < data.body.data.airports.length; i++) {
        const airportData = data.body.data.airports[i];
        const airport: AirportTemplate = {
          id: airportData._id,
          location: airportData.location,
          name: airportData.name,
        };
        this.airports.push(airport);
      }
    });
  }

  getAllAirlines() {
    this.airlineService.getAllAirports([]).subscribe((data) => {
      this.airlines = [];
      for (let i = 0; i < data.body.data.airlines.length; i++) {
        const airlineData = data.body.data.airlines[i];
        const airline: AirlineTemplate = {
          id: airlineData._id,
          name: airlineData.name,
          contact: airlineData.contact,
        };
        this.airlines.push(airline);
      }
    });
  }

  getAllAirplanes() {
    this.airplaneService.getAllAirports([]).subscribe((data) => {
      this.airplanes = [];
      for (let i = 0; i < data.body.data.airplanes.length; i++) {
        const airplaneData = data.body.data.airplanes[i];
        const airplane: AirplaneTemplate = {
          id: airplaneData._id,
          type: airplaneData.type,
          capacity: airplaneData.capacity,
          licensePlate: airplaneData.licensePlate,
        };
        this.airplanes.push(airplane);
      }
    });
  }

  createFlight(airplane: AirplaneTemplate) {
    const flight: CreateFlightTemplate = {
      startDate: new Date(Date.parse(this.flightFormGroup.controls.start.value) + (this.flightFormGroup.controls.startHour.value * 60 * 60 * 1000)).toISOString(),
      arrivalDate: new Date(Date.parse(this.flightFormGroup.controls.arrive.value) + (this.flightFormGroup.controls.arriveHour.value * 60 * 60 * 1000)).toISOString(),
      from: this.flightFormGroup.controls.from.value,
      to: this.flightFormGroup.controls.to.value,
      airline: this.flightFormGroup.controls.airline.value,
      airplane: this.flightFormGroup.controls.airplane.value,
    };
    this.flightService.createFlight(flight).subscribe(data => {
      const newFlightId = data.body.data.flight._id;
      for (let i = 0; i < airplane.capacity; i++) {
        const ticket: CreateTicketTemplate = {flight: newFlightId, price: this.flightFormGroup.controls.ticketPrice.value};
        this.ticketService.createTicket(ticket).subscribe();
      }
      this.router.navigate(['/flights']);
    })
  }

  ngOnInit(): void {
    this.getAllAirports();
    this.getAllAirlines();
    this.getAllAirplanes();
  }
}
