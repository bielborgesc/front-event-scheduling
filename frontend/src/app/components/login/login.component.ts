import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  login(): void{
    const user = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    }
    this.userService.login(user)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
