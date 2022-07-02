import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from './../../services/user.service';
import { NgToastService} from 'ng-angular-popup';

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
    private toast: NgToastService
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
        this.toast.success({detail: "Mensagem de Sucesso", summary: "Login realizado com sucesso", duration: 5000})
      },
      error => {
        this.toast.error({detail: "Mensagem de Erro", summary: error.error.message, duration: 5000})
      }
    )
  }

}
