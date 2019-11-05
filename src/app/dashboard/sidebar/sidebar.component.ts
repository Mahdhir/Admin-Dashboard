import { AuthService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style, state, keyframes } from '@angular/animations'
import {FormControl} from '@angular/forms';

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
    ]),
    trigger('sideBar',[
      state('small', style({height: '0px'})),
      state('large', style({height: '100vh'})),

      transition('small <=> large', animate('20ms ease-in'))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  state: string = 'large';

  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }
 
  
  logOut() {
    this.authService.logout();
    console.log('Logout');
  }

  ngOnInit() {
  }

  
}
