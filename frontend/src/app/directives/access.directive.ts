import { Directive, Renderer2, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appAccess]'
})
export class LogoutDirective implements OnInit{
  constructor(
    private auth: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.auth.emitAuthenticationStatus.subscribe(status => this.showButtonLogout(status));
  }

  showButtonLogout(authenticated: boolean) {
    if(authenticated) this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    else this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
  }

}
