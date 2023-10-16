import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChiimeService } from 'src/app/services/chiime/chiime.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {


  editMode: boolean = false;
  profile$?: Observable<Profile>;
  followers: string[] = [''];
  @Output() chiimeList: any;
  editProfileForm: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private chiimeService: ChiimeService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService,
    public fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('username');
    this.profile$ = this.chiimeService.getProfile(userName!)

    this.editMode;

  }

  editForm(){
    this.editProfileForm = this.fb.group({
      bio: [''],
    })

  }


  follow(): void {
    const usernamer = this.route.snapshot.paramMap.get('username');
    this.chiimeService.followUser(usernamer!).subscribe({
      next: (response) => {this.profile$, this.toastr.success();}
    });
  }
  unfollow(): void {
    const usernamer = this.route.snapshot.paramMap.get('username');
    this.chiimeService.unfollowUser(usernamer!).subscribe({
      next: (response) => {this.profile$, this.toastr.success();}
    });

  }
  enterEditMode(){
    this.editMode = true;
    this.editForm();



  }
  saveProfile(): void{
    const values = {...this.editProfileForm.value}
    console.log(values)
    this.authService.editProfile(values).subscribe({

      next: _ => {
        this.toastr.success

      },
      error: err => console.log(values)
    })
    this.editMode = false;
  }
  cancel(){
    this.editMode = false;
    this.editProfileForm.reset();
  }

 ngOnDestroy(): void {

 }
}
