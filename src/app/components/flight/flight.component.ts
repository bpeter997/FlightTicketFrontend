import { Router } from '@angular/router';
import { FlightTemplate } from '../../interfaces/flightTemplate';
import { FlightService } from './../../services/flight/flight.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.sass']
})
export class FlightComponent implements OnInit {

  flights: any = [];
  dataSource = new MatTableDataSource<FlightTemplate>(this.flights);
  displayedColumns: Array<string> = ['From', 'To', 'Start', 'Arrive', 'Airplane', 'Airline', 'Tickets'];

  constructor(private flightService: FlightService, private router: Router) { }

  getFlights(params: Array<string>) {
    this.flightService.selectedFlightId = '';
    this.flightService.getAllFlights(params).subscribe(data => {
      const tempFlights: Array<FlightTemplate> = []; 
      this.flights = data.body.data.flights;
      this.createDataForTable(tempFlights);
      this.dataSource.data = tempFlights;
    })
  }

  private createDataForTable(tempFlights: FlightTemplate[]) {
    for (const flight of this.flights) {
      tempFlights.push(
        {
          id: flight._id,
          start: flight.startDate,
          arrive: flight.arrivalDate,
          from: flight.from.location,
          to: flight.to.location,
          airplane: flight.airplane,
          airline: flight.airline
        }
      );
    }
  }

  openTicketsPage(flight: FlightTemplate) {
    this.flightService.selectedFlightId = flight.id;
    this.router.navigate(['/tickets']);
  }

  ngOnInit(): void {
    this.getFlights([]);
  }

}
