import { TicketService } from './../../services/ticket/ticket.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight/flight.service';
import { TicketTemplate } from 'src/app/interfaces/ticketTemplate';

@Component({
  selector: 'app-available-tickets-by-flight',
  templateUrl: './available-tickets-by-flight.component.html',
  styleUrls: ['./available-tickets-by-flight.component.sass']
})
export class AvailableTicketsByFlightComponent implements OnInit {

  availableTickets: Array<TicketTemplate> = [];
  dataSource = new MatTableDataSource<TicketTemplate>(this.availableTickets);
  displayedColumns: Array<string> = ['Price', 'Buy'];

  private _availableTicketsQueryString: string = 'email[exists]=false';
  private _flightQueryString: string = 'flight=';

  getTickets(...params: Array<string>) {
    this.ticketService.getAllTickets(...params).subscribe(data => { 
      this.availableTickets = data.body.data.tickets;
      this.dataSource.data = this.availableTickets;
    })
  }

  buyTicket(ticket: TicketTemplate) {
    console.log(ticket);
  }

  constructor(private flightService: FlightService, private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    if (this.flightService.selectedFlightId == '') {
      this.router.navigate(['/flights']);
    }
    console.log(this.flightService.selectedFlightId);
    
    this.getTickets(this._availableTicketsQueryString,this._flightQueryString+this.flightService.selectedFlightId);
  }

}
