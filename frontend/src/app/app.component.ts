import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Event Scheduling';

  constructor(
    private auth: AuthService,
  ) { }

  getVisibility(){
    if(this.auth.isAuthenticated()){
      return 'block';
    }
    return 'none'
  }
}
