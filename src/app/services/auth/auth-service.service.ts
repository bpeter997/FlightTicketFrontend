import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "./userInterface";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = environment.serverURL + environment.userUrl;
  }

  signUp(name: string, email: string, password: string, role?: string): Observable<any> {
    const userObj: User = {
      name: name,
      email: email,
      password: password
    };
    if (role) userObj.role = role;

    return this.http.post(
      this.userUrl + "/signup",
      userObj,
      {
        withCredentials: true,
        responseType: "text",
        observe: "response" as "response",
      }
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      this.userUrl + "/login",
      { email: email, password: password },
      {
        withCredentials: true,
        responseType: "text",
        observe: "response" as "response",
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      this.userUrl + "/logout",
      {},
      { withCredentials: true, responseType: "text" }
    );
  }
}
