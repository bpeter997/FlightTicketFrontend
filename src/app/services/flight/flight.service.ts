import { QueryString } from "./../../helpers/QueryString";
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
    this._selectedFlightId = "";
    this._flightUrl = environment.serverURL + environment.flightsUrl;
  }

  getAllFlights(queryParams: Array<string>): Observable<any> {
    return this.http.get(
      this._flightUrl + QueryString.createQueryString(queryParams),
      {
        withCredentials: true,
        responseType: "json",
        observe: "response" as "response",
      }
    );
  }

  getFlight(flightId: string): Observable<any> {
    return this.http.get(this._flightUrl + "/" + flightId, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  deleteFlight(flightId: string): Observable<any> {
    return this.http.delete(this._flightUrl + "/" + flightId, {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  getMostPopularFlight(): Observable<any> {
    return this.http.get(this._flightUrl + "/stats/mostPopular", {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }

  public get selectedFlightId(): string {
    return this._selectedFlightId;
  }

  public set selectedFlightId(v: string) {
    this._selectedFlightId = v;
  }
}
