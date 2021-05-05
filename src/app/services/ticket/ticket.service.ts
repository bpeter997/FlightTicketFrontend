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

  getAllTickets(...queryParams: Array<string>): Observable<any> {
    return this.http.get(
      this._ticketUrl + this.createQueryString(queryParams),
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getTicket(ticketId: string): Observable<any> {
    return this.http.get(
      this._ticketUrl + '/' + ticketId,
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  updateTicket(id: string, body: any): Observable<any> {
    return this.http.patch(this._ticketUrl + "/" + id, body, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  private createQueryString(queryParams: string[]): string {
    let quryUrl: string = "";
    if (queryParams && queryParams.length + 0)
      quryUrl = "?" + queryParams.join("&");
    return quryUrl;
  }
}
