import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryString } from 'src/app/helpers/QueryString';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {
  private _airplanesUrl: string;

  constructor(private http: HttpClient) {
    this._airplanesUrl = environment.serverURL + environment.airplanesUrl;
  }

  getAllAirports(queryParams: Array<string>): Observable<any> {
    return this.http.get(this._airplanesUrl + QueryString.createQueryString(queryParams), {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }
  
}
