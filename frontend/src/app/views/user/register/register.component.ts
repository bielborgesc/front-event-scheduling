import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
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
    this.userService.create(user)
    .subscribe(
      response => {
        this.router.navigate(['/login']);
        this.toast.success({detail: "Mensagem de Sucesso", summary: "Conta criada com sucesso", duration: 5000})
      },
      error => {
        console.log(error);
        this.toast.error({detail: "Mensagem de Erro", summary: "Houve um erro tente novamente", duration: 5000})
      }
    )
  }

}
