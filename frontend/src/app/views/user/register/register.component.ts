import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError, tap } from 'rxjs';
import { CustomValidator } from 'src/app/validators/custom.validator';
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
  }, [CustomValidator.MatchValidator('password', 'confirmPassword')]
  )

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
  }

  verifyValidTouched(inputName: any) {
    return !this.formRegister.get(inputName)!.valid && this.formRegister.get(inputName)!.touched ;
  }

  getPasswordMatchError() {
    return (
      (this.formRegister.getError('mismatch') || this.formRegister.get('confirmPassword')?.value === "" )&&
      this.formRegister.get('confirmPassword')!.touched
    );
  }

  setCssErro(inputName: any) {
    return {
      'is-invalid': this.verifyValidTouched(inputName),
    };
  }

  setCssErroConfirmPassword() {
    return {
      'is-invalid': !!this.getPasswordMatchError(),
    };
  }

  create(): void{
    const user = {
      name: this.formRegister.value.name,
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      confirmPassword: this.formRegister.value.confirmPassword
    }
    this.userService.create(user)
    .pipe(
      tap( (value) => {
        this.router.navigate(['/login']);
        this.toast.success({detail: "Mensagem de Sucesso", summary: "Conta criada com sucesso", duration: 5000})
      }),
      catchError(async (err) => this.toast.error({detail: "Mensagem de Erro", summary: err.error.message, duration: 5000}))
    )
    .subscribe()
  }

}
