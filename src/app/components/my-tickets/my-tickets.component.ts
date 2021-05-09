import { TicketTemplate } from 'src/app/interfaces/ticketTemplate';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MyTicketTemplate } from 'src/app/interfaces/myTicketTemplate';
import { FlightService } from 'src/app/services/flight/flight.service';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.sass']
})
export class MyTicketsComponent implements OnInit {
  currentYear: number;
  myTickets: Array<MyTicketTemplate> = [];
  dataSource = new MatTableDataSource<MyTicketTemplate>(this.myTickets);
  displayedColumns: Array<string> = ['From', 'To', 'Start', 'Price'];
  myStats: any;

  private _availableTicketsQueryString: string = 'email=' + localStorage.getItem('email');

  constructor(private flightService: FlightService, private ticketService: TicketService, private router: Router) { 
    this.currentYear = new Date(Date.now()).getFullYear();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getMyTicketStats() {
    this.ticketService.getMyTicketStats().subscribe(data => {
      console.log(data);
      if (data.body.data.ticket.length == 1) {
        this.myStats = data.body.data.ticket[0]
      } else {
        this.myStats = null;
      }
      console.log(this.myStats);
      
    })
  }

  getTickets() {
    this.myTickets = [];
    this.ticketService.getAllTickets(this._availableTicketsQueryString).subscribe(ticketData => { 
      const tickets: Array<TicketTemplate> = ticketData.body.data.tickets;
      for (const ticket of tickets) {
        this.flightService.getFlight(ticket.flight).subscribe(flightData => {
            const flight = flightData.body.data.flight;
            this.myTickets.push({from: flight.from.location, to: flight.to.location, start: flight.startDate, price: ticket.price});
            this.dataSource.data = this.myTickets;
        });
      }
    });
  }

  ngOnInit(): void {
    this.currentYear = new Date(Date.now()).getFullYear();
    this.getTickets();
    this.getMyTicketStats()
  }

}
