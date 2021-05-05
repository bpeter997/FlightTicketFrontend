import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FlightService {
  private _flightUrl: string;
  private _selectedFlightId: string;

  constructor(private http: HttpClient) {
    this._selectedFlightId = '';
    this._flightUrl = environment.serverURL + environment.flightsUrl;
  }

  getAllFlights(...queryParams: Array<string>): Observable<any> {
    return this.http.get(this._flightUrl + this.createQueryString(queryParams), {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  getFlight(flightId: string): Observable<any> {
    return this.http.get(
      this._flightUrl + '/' + flightId,
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  private createQueryString(queryParams: string[]): string {
    let quryUrl: string = "";
    if (queryParams && queryParams.length + 0)
      quryUrl = "?" + queryParams.join("&");
    return quryUrl;
  }

  
  public get selectedFlightId() : string {
    return this._selectedFlightId
  }

  
  public set selectedFlightId(v : string) {
    this._selectedFlightId = v;
  }
  
  
}
