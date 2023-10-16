import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoopAnimationPlayer } from '@angular/animations';
import { GlobalComponent } from './global/global/global.component';
import { ChiimeComponent } from './create/chiime/chiime.component';
import { CommentComponent } from './create/comment/comment.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { ProfileComponent } from './profile/profile/profile.component';
import { ChiimeListComponent } from './chiimeList/chiimeList.component';
import { ChiimeFullComponent } from './chiime-full/chiime-full.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      RegisterComponent,
      LoginComponent,
      GlobalComponent,
      NavbarComponent,
      ChiimeComponent,
      CommentComponent,
      ProfileComponent,
      ChiimeListComponent,
      ChiimeFullComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true,}, {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
