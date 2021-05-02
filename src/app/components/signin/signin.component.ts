import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;


  constructor(private authServise: AuthServiceService, private router: Router) { 
    this.email = '';
    this.password = '';
  }

  login() {
    if (this.email != '' && this.password != '') {
      this.authServise.login(this.email, this.password).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('email', this.email);
        this.router.navigate(['/flights']);
      }, error => {
        console.log(error);
      });
    };
  
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      localStorage.removeItem('email');
      this.authServise.logout().subscribe(msg => {
        console.log(msg);
      }, error => {
        console.log(error);
        
      });
    }
  }

}
