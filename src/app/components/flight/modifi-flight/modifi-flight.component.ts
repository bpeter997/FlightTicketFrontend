import { FlightTemplate } from "./../../../interfaces/flightTemplate";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { AirlineTemplate } from "src/app/interfaces/airlineTemplate";
import { AirplaneTemplate } from "src/app/interfaces/airplaneTemplate";
import { AirportTemplate } from "src/app/interfaces/airportTemplate";
import { CreateFlightTemplate } from "src/app/interfaces/createFlightTemplate";
import { CreateTicketTemplate } from "src/app/interfaces/createTicketTemplate.";
import { AirlineService } from "src/app/services/airline/airline.service";
import { AirplaneService } from "src/app/services/airplane/airplane.service";
import { AirportService } from "src/app/services/airport/airport.service";
import { FlightService } from "src/app/services/flight/flight.service";
import { TicketService } from "src/app/services/ticket/ticket.service";

@Component({
  selector: "app-modifi-flight",
  templateUrl: "./modifi-flight.component.html",
  styleUrls: ["./modifi-flight.component.sass"],
})
export class ModifiFlightComponent implements OnInit {
  id: string;
  airlines: Array<AirlineTemplate>;
  airplanes: Array<AirplaneTemplate>;
  airports: Array<AirportTemplate>;

  flightFormGroup: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private airportService: AirportService,
    private airlineService: AirlineService,
    private airplaneService: AirplaneService,
    private flightService: FlightService,
    private ticketService: TicketService
  ) {
    this.id = this.route.snapshot.paramMap.get("id") + '';
    this.flightFormGroup = new FormGroup({
      start: new FormControl("", Validators.required),
      arrive: new FormControl("", Validators.required),
      startHour: new FormControl("", Validators.required),
      arriveHour: new FormControl("", Validators.required),
      from: new FormControl("", Validators.required),
      to: new FormControl("", Validators.required),
      airline: new FormControl("", Validators.required),
      airplane: new FormControl("", Validators.required)
    });
    this.airlines = [];
    this.airplanes = [];
    this.airports = [];
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

  private getMyFlight() {
    
    this.flightService.getFlight(this.id).subscribe(data => {
      const flightData = data.body.data.flight;
      const actualFlight: CreateFlightTemplate = {
        startDate: flightData.startDate,
        arrivalDate: flightData.arrivalDate,
        from: flightData.from._id,
        to: flightData.to._id,
        airline: flightData.airline[0]._id,
        airplane: flightData.airplane[0]._id
      };
      this.setFormGroutInitialValue(actualFlight);
    });
  }

  updateFlight() {
    const flight: CreateFlightTemplate = {      
      startDate: new Date(Date.parse(this.flightFormGroup.controls.start.value) + (this.flightFormGroup.controls.startHour.value * 60 * 60 * 1000)).toISOString(),
      arrivalDate: new Date(Date.parse(this.flightFormGroup.controls.arrive.value) + (this.flightFormGroup.controls.arriveHour.value * 60 * 60 * 1000)).toISOString(),
      from: this.flightFormGroup.controls.from.value,
      to: this.flightFormGroup.controls.to.value,
      airline: this.flightFormGroup.controls.airline.value,
      airplane: this.flightFormGroup.controls.airplane.value,
    };
    console.log(flight);
    this.flightService.updateFlight(this.id, flight).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/flights"]);
    });
  }

  private setFormGroutInitialValue(actualFlight: CreateFlightTemplate) {
    this.flightFormGroup = new FormGroup({
      start: new FormControl(new Date(new Date(actualFlight.startDate).setHours(0,0,0,0)), Validators.required),
      arrive: new FormControl(new Date(new Date(actualFlight.arrivalDate).setHours(0,0,0,0)), Validators.required),
      startHour: new FormControl(new Date(actualFlight.startDate).getHours(), Validators.required),
      arriveHour: new FormControl(new Date(actualFlight.arrivalDate).getHours(), Validators.required),
      from: new FormControl(actualFlight.from, Validators.required),
      to: new FormControl(actualFlight.to, Validators.required),
      airline: new FormControl(actualFlight.airline, Validators.required),
      airplane: new FormControl(actualFlight.airplane, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getMyFlight();
    this.getAllAirports();
    this.getAllAirlines();
    this.getAllAirplanes();
  }
}
