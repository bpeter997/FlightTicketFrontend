import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Router } from '@angular/router';
import { FlightTemplate } from '../../interfaces/flightTemplate';
import { FlightService } from './../../services/flight/flight.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.sass']
})
export class FlightComponent implements OnInit, AfterViewInit {
  isAdmin: boolean;
  flights: any = [];
  dataSource = new MatTableDataSource<FlightTemplate>(this.flights);
  displayedColumns: Array<string> = ['From', 'To', 'Start', 'Arrive', 'Airplane', 'Airline', 'Tickets'];
  mostPopularFlight: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private ticketService: TicketService, private flightService: FlightService, private router: Router) {
    this.isAdmin = localStorage.getItem('role') == 'admin';
  }

  getMostPopularFlight() {
    this.flightService.getMostPopularFlight().subscribe(data => {
      this.mostPopularFlight = data.body.data.flight[0]._id.from + ' - ' + data.body.data.flight[0]._id.to;
    })
  }

  updateFlight(flight: FlightTemplate) {
    this.router.navigate(['/updateFlight', flight.id])
  }

  deleteFlight(flight: FlightTemplate) {
    console.log(flight);
    this.flightService.deleteFlight(flight.id).subscribe(msg => {
      console.log(msg);
      const queryString = 'flight='+flight.id;
      this.ticketService.getAllTickets(queryString).subscribe(data => {
        const tickets = data.body.data.tickets;
        if (tickets.length == 0) {
          console.log('no ticket attached for this flight');
          this.getFlights([]);
          return;
        }
        for (const ticket of tickets) {
          this.ticketService.deleteTicket(ticket._id).subscribe(msg => {
            console.log(msg);
          })
        }
        this.getFlights([]);
      })
    })
    
  }

  getFlights(params: Array<string>) {
    this.flightService.selectedFlightId = '';
    this.flightService.getAllFlights(params).subscribe(data => {
      console.log(data);
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
    this.isAdmin = localStorage.getItem('role') == 'admin';
    this.getFlights([]);
    this.getMostPopularFlight();
    this.dataSource.paginator = this.paginator;
  }

}
