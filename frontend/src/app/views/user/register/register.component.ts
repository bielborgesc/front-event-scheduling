import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({
    name: new FormControl('',[Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }

  verifyValidTouched(inputName: any) {
    return !this.formRegister.get(inputName)!.valid && this.formRegister.get(inputName)!.touched;
  }

  setCssErro(inputName: any) {
    return {
      'is-invalid': this.verifyValidTouched(inputName),
    };
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
