import { CreateTicketTemplate } from './../../interfaces/createTicketTemplate.';
import { TicketTemplate } from 'src/app/interfaces/ticketTemplate';
import { QueryString } from './../../helpers/QueryString';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TicketService {
  private _ticketUrl: string;

  constructor(private http: HttpClient) {
    this._ticketUrl = environment.serverURL + environment.ticketsUrl;
  }

  getMyTicketStats(): Observable<any> {
    return this.http.get(
      this._ticketUrl + "/myTicketStats/" + localStorage.getItem("email"),
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getAllTickets(...queryParams: Array<string>): Observable<any> {
    return this.http.get(
      this._ticketUrl + QueryString.createQueryString(queryParams),
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getTicket(ticketId: string): Observable<any> {
    return this.http.get(this._ticketUrl + "/" + ticketId, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  deleteTicket(ticketId: string): Observable<any> {
    return this.http.delete(this._ticketUrl + "/" + ticketId, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  updateTicket(id: string, body: any): Observable<any> {
    return this.http.patch(this._ticketUrl + "/" + id, body, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  createTicket(ticket: CreateTicketTemplate): Observable<any> {
    return this.http.post(this._ticketUrl, ticket, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    })
  }
}
