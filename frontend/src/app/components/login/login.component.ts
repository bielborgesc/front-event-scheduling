import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private userService: UserService,
    private router: Router,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  login(): void{
    const user = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }
    this.userService.login(user)
    .subscribe(
      response => {
        localStorage.setItem ('token', response.token);

        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    )
  }

}
