import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 title = 'Chiime';

constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.setCurrentUser();
  }




  setCurrentUser(){
    const userString = localStorage.getItem('user')
    if(!userString) return;
    const user: User =JSON.parse(userString);
    this.authService.setCurrentUser(user);
  }


}
