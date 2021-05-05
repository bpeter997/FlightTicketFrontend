import { TicketTemplate } from 'src/app/interfaces/ticketTemplate';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyTicketTemplate } from 'src/app/interfaces/myTicketTemplate';
import { FlightService } from 'src/app/services/flight/flight.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.sass']
})
export class MyTicketsComponent implements OnInit {

  myTickets: Array<MyTicketTemplate> = [];
  dataSource = new MatTableDataSource<MyTicketTemplate>(this.myTickets);
  displayedColumns: Array<string> = ['Price', 'Buy'];

  private _availableTicketsQueryString: string = 'email=' + localStorage.getItem('email');

  constructor(private flightService: FlightService, private ticketService: TicketService, private router: Router) { }

  getTickets() {
    this.myTickets = [];
    this.ticketService.getAllTickets(this._availableTicketsQueryString).subscribe(ticketData => { 
      const tickets: Array<TicketTemplate> = ticketData.body.data.tickets;
      for (const ticket of tickets) {
        this.flightService.getFlight(ticket.flight).subscribe(flightData => {
            const flight = flightData.body.data.flight
            this.myTickets.push({from: flight.from, to: flight.to, start: flight.start, price: ticket.price})
        });
      }
      this.dataSource.data = this.myTickets;
      console.log(this.myTickets);
      
    });
  }

  ngOnInit(): void {
    this.getTickets()
  }

}
