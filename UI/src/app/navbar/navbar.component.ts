import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth/auth.service';
import { ChiimeService } from '../services/chiime/chiime.service';
import { Profile } from '../models/Profile';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  model: any = {}
  profileSub?: Subscription;


  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService, private chiimeService: ChiimeService,private route: ActivatedRoute){}
  ngOnInit(): void {


  }

  landing(){
    const user = this.authService.getUser();

    if(user){

      this.router.navigateByUrl("/")
    }else {
      this.router.navigateByUrl('/public')
    }
  }
  getProfile(userName: string){

    this.profileSub = this.chiimeService.getProfile(userName!).subscribe({
      next: _ => {}
    })

  }


  login(){
    this.authService.login(this.model)
    .subscribe({
      next: () => this.router.navigateByUrl(''),

    })
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/")

  }
  ngOnDestroy(): void {
    this.profileSub?.unsubscribe;
  }

}
