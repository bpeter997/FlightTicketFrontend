import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private _ticketUrl: string;

  constructor(private http: HttpClient) {
    this._ticketUrl = environment.serverURL + environment.ticketsUrl;
   }

   getAllTickets(...queryParams: Array<string>): Observable<any> {
    console.log(queryParams, this._ticketUrl + this.createQueryString(queryParams));
    return this.http.get(this._ticketUrl + this.createQueryString(queryParams), {
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
