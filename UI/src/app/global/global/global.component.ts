import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChiimeComponent } from 'src/app/create/chiime/chiime.component';
import { ChiimeService } from 'src/app/services/chiime/chiime.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css'],
})
export class GlobalComponent implements OnInit {
  @Output() chiimeList: any;
  feed: boolean = true;

  constructor(private http: HttpClient, public dialog: MatDialog, private chiimeService: ChiimeService) {
    this.feed = true;
  }

  ngOnInit(): void {
    this.getPublicFeed();
  }

  getPublicFeed() {

    this.chiimeService.getAllChiime().subscribe({
      next: response => {this.chiimeList = response}
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
      this.getPublicFeed();
    });
  }


}
