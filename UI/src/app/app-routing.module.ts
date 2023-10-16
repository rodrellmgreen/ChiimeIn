import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ProfileComponent } from './profile/profile/profile.component';
import { GlobalComponent } from './global/global/global.component';
import { ChiimeFullComponent } from './chiime-full/chiime-full.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'public', component: GlobalComponent},
  {path: 'profile/:username', component: ProfileComponent},
  {path: 'chiime/:id', component: ChiimeFullComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
