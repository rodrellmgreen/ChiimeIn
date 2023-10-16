import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginForm =this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

    });

  }


  login(){
    const values = {...this.loginForm.value}
    this.authService.login(values).subscribe({
      next: () => {

        this.router.navigateByUrl('')
      },
      error: error => {
        this.validationErrors = error;
      }
    })
  }

}
