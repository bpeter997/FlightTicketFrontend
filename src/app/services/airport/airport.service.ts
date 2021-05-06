import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryString } from 'src/app/helpers/QueryString';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private _airportsUrl: string;

  constructor(private http: HttpClient) {
    this._airportsUrl = environment.serverURL + environment.airportstUrl;
   }

  getAllAirports(queryParams: Array<string>): Observable<any> {
    return this.http.get(this._airportsUrl + QueryString.createQueryString(queryParams), {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }
}
