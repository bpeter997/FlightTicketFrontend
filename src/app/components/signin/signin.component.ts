import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  signInFormGroup: FormGroup;

  constructor(private authServise: AuthServiceService, private router: Router, private appComponent: AppComponent) { 
    this.signInFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  signIn() {
    if (this.signInFormGroup.valid) {
      this.authServise.login(this.signInFormGroup.value.email, this.signInFormGroup.value.password).subscribe(msg => {
        console.log(msg);
        localStorage.setItem('email', this.signInFormGroup.value.email);
        this.router.navigate(['/flights']);
        this.appComponent.isAuthenticated = true;
      }, error => {
        console.log(error);
      });
    };
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.authServise.logout().subscribe(msg => {
        console.log(msg);
        this.appComponent.isAuthenticated = false;
        localStorage.removeItem('email');
      }, error => {
        console.log(error);
        this.appComponent.isAuthenticated = false;
        localStorage.removeItem('email');
      });
    }
  }

}
