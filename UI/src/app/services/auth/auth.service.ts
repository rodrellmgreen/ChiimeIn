import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Profile } from 'src/app/models/Profile';
import { EditProfile } from 'src/app/models/EditProfile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment.apiUrl


private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();


constructor(private http: HttpClient){}

login(model: User){
  return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
    map((response: User) => {
      const user = response;
      if(user){
        this.setCurrentUser(user);
      }
    })
  )
}


register(model:any){
  return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
    map(user => {
      if(user){
        this.setCurrentUser(user);
      }
    })
  )
}
editProfile(model: any){
  console.log(model)
  return this.http.put<any>(this.baseUrl + 'account/profile/edit', model)
}

setCurrentUser(user: User){
  localStorage.setItem('user', JSON.stringify(user))
  this.currentUserSource.next(user);
}
logout(){
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
}

getUser(): User | undefined{
  const userName = localStorage.getItem('user-userName');
  const token = localStorage.getItem('user-token');

  if(userName && token){
    const user: User = {
      userName: userName,
      token: token
    }
    
    return user;
  }
  return undefined;
}

}
