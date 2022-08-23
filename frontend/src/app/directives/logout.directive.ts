import { Directive, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appLogout]'
})
export class LogoutDirective {
  constructor(
    private auth: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) {
    this.getVisibility()
  }

  getVisibility(){
    this.auth.isAuthenticatedObs().subscribe(isAuthenticated => {
      console.log(isAuthenticated);
      if(isAuthenticated){
        this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
      } else {
        this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
      }
    });
  }

}
