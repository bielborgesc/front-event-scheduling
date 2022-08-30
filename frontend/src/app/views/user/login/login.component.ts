import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../../service/user.service';
import { NgToastService} from 'ng-angular-popup';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('borges@dev.com'),
    password: new FormControl('@Gabriel05'),
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
    const router = this.router;
    const toast = this.toast;
    this.userService.login(this.formLogin.value)
      .subscribe({
        next(value) {
          localStorage.setItem('token', value.token);
          router.navigate(['']);
          toast.success({detail: "Mensagem de Sucesso", summary: "Login realizado com sucesso", duration: 5000})
        },
        error(err) {
          toast.error({detail: "Mensagem de Erro", summary: "Houve um erro tente novamente", duration: 5000})
        },
      })
  }
}
