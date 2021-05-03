import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./userInterface";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = environment.serverURL + environment.userUrl;
  }



  signUp(name: string, email: string, password: string, role?: string) {
    
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

  login(email: string, password: string) {
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

  logout() {
    return this.http.post(
      this.userUrl + "/logout",
      {},
      { withCredentials: true, responseType: "text" }
    );
  }
}
