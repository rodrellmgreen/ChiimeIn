import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ChiimeComponent } from '../create/chiime/chiime.component';
import { ChiimeService } from '../services/chiime/chiime.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 @Output() chiimeList: any;
  feed: boolean = true;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private chiimeService: ChiimeService,

  ) {
    this.feed = true;
  }

  ngOnInit(): void {
    this.getFeed();
  }


  getFeed() {
    this.chiimeService.getFeed().subscribe({
      next: response => this.chiimeList = response,
    })
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(ChiimeComponent, {
      width: '85%',
      height: '85%',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getFeed();
    });
  }

}
