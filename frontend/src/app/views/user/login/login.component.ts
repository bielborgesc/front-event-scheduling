import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../../service/user.service';
import { NgToastService} from 'ng-angular-popup';
import { User } from '../../../model/user.model';
import { LogoutDirective } from 'src/app/directives/access.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  formLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(
    private userService: UserService,
    private router: Router,
    public auth: AuthService,
    private toast: NgToastService,
  ) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  login(): void{
    this.user.email = "borges@dev.com";
    this.user.password = "@Gabriel05";
    this.userService.login(this.user)
    .subscribe(
      response => {
        localStorage.setItem ('token', response.token);
        this.router.navigate(['']);
        this.toast.success({detail: "Mensagem de Sucesso", summary: "Login realizado com sucesso", duration: 5000})
      },
      error => {
        this.toast.error({detail: "Mensagem de Erro", summary: "Houve um erro tente novamente", duration: 5000})
      }
    )
  }

}
