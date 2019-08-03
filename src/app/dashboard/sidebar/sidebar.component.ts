import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-11%)'}),
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('370ms ease-in', style({transform: 'translateY(-12%)'}))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {

  val = false;
  val2=false;
  constructor() { }

  ngOnInit() {
  }

  ads(){
    if(this.val==false)
    this.val = true;
    else
    this.val=false;
  }
  noad(){
    this.val = false;
  }
  promos(){
    if(this.val2==false)
    this.val2 = true;
    else
    this.val2=false;
  }
  nopromos(){
    this.val2 = false;
  }
}
