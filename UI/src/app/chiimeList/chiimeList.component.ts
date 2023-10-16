import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chiimeList',
  templateUrl: './chiimeList.component.html',
  styleUrls: ['./chiimeList.component.css']
})
export class ChiimeListComponent implements OnInit {
  @Input() chiimeList: any;
  constructor() { }

  ngOnInit() {
  }
 

}
