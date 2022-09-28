import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from '../../../service/user.service';
import { NgToastService} from 'ng-angular-popup';
import { tap, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new UntypedFormGroup({
    email: new UntypedFormControl(),
    password: new UntypedFormControl(),
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
    this.userService.login(this.formLogin.value)
      .pipe(
        tap((value) => {
          localStorage.setItem('token', value.token);
          this.router.navigate(['']);
          this.toast.success({detail: "Mensagem de Sucesso", summary: "Login realizado com sucesso", duration: 5000})
        }),
        catchError(async (err) => this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000}))
      )
      .subscribe()
  }
}
