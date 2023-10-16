import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegistration = new EventEmitter();
  hide = true;

  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] | undefined;


  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    };
  }

  initForm(){
    this.registerForm =this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', [
        Validators.required, this.matchValues('password'),
      ]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () =>
      this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
  }
  register(){
    const values = {...this.registerForm.value}
    this.authService.register(values).subscribe({
      next: () => {
        this.toastr.success();
        this.router.navigateByUrl('')
      },
      error: error => {
        
        this.toastr.error(error)
      }
    })
   }
   cancel(){
    this.cancelRegistration.emit(false);
   }



}
