import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt/lib/jwthelper.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  user: any;

  constructor(private authService: AuthService) {}



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: user => {

        if(user){
          request =request.clone({
            setHeaders:{
              Authorization: `Bearer ${user.token}`
            }
          })
        }
      },
      error: err => {
        if(err instanceof HttpErrorResponse){
          console.log(err.status);
          console.log(err.message);
          if(err.status === 401){
            this.authService.logout()
          }
        }
      }
    })

    return next.handle(request);
  }



}
