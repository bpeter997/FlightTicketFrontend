import { MatNativeDateModule } from '@angular/material/core';
import { AirlineService } from './../../../services/airline/airline.service';
import { AirplaneService } from './../../../services/airplane/airplane.service';
import { AirportService } from './../../../services/airport/airport.service';
import { AirportTemplate } from './../../../interfaces/airportTemplate';
import { AirlineTemplate } from './../../../interfaces/airlineTemplate';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AirplaneTemplate } from 'src/app/interfaces/airplaneTemplate';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.sass']
})
export class AddFlightComponent implements OnInit {

  airlines: Array<AirlineTemplate>;
  airplanes: Array<AirplaneTemplate>;
  airports: Array<AirportTemplate>

  flightFormGroup: FormGroup;

  constructor(private airportService: AirportService, private airlineService: AirlineService, private airplaneService: AirplaneService) { 
    this.airlines = [];
    this.airplanes = [];
    this.airports = [];
    this.flightFormGroup = new FormGroup({
      start: new FormControl('', Validators.required),
      arrive: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      airline: new FormControl('', Validators.required),
      airplane: new FormControl('', Validators.required),
    })
  }

  getAllAirports() {
    this.airportService.getAllAirports([]).subscribe(data => {
      this.airports = [];
      for (let i = 0; i < data.body.data.airports.length; i++) {
        const airportData = data.body.data.airports[i];
        const airport: AirportTemplate = {id: airportData._id, location: airportData.location, name: airportData.name};
        console.log(airport);
        this.airports.push(airport)
      }
    })
  }

  createFlight(){}

  ngOnInit(): void {
    this.getAllAirports();
  }

}
