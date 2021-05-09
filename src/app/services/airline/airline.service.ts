import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryString } from 'src/app/helpers/QueryString';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private _airlinesUrl: string;

  constructor(private http: HttpClient) {
    this._airlinesUrl = environment.serverURL + environment.airlinesUrl;
  }

  getAllAirports(queryParams: Array<string>): Observable<any> {
    return this.http.get(this._airlinesUrl + QueryString.createQueryString(queryParams), {
      withCredentials: true,
      responseType: "json",
      observe: "response" as "response",
    });
  }
  
}
