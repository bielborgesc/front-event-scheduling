import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    confirmPassword: new UntypedFormControl(''),
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }

  create(): void{
    const user = {
      name: this.formRegister.value.name,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password
    }
    const router = this.router;
    const toast = this.toast;
    this.userService.create(user)
    .subscribe({
      next(value) {
        router.navigate(['/login']);
        toast.success({detail: "Mensagem de Sucesso", summary: "Conta criada com sucesso", duration: 5000})
      },
      error(err) {
        toast.error({detail: "Mensagem de Erro", summary: "Houve um erro tente novamente", duration: 5000})
      }
    })
  }

}
