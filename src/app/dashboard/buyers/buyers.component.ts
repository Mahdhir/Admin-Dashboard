import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth-service.service';

import { NgxSmartModalService } from 'ngx-smart-modal';
import {UsermanagmentService} from 'src/app/services/usermanagment.service'
@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  users: any = [];
  searchText = null ;
  modalService: any;
  showSpinner=true;
  constructor(
    private userService: UserService,
    private authservice:AuthService,
    public ngxSmartModalService: NgxSmartModalService,
    private userManagmentService : UsermanagmentService
    ) { }

  ngOnInit() {
    this.loadData();
  }

  logOut(){
    this.authservice.logout();
    console.log("logout");
  }
  LockBuyer(id){
    console.log(id);
    if (confirm('Are you sure you want to block this Buyer ?')) {
     
      let fordays = parseInt(window.prompt("Number of Days") );
      debugger;
      if(isNaN(fordays))
      fordays=null;
      this.userManagmentService.LockUser(id,fordays).subscribe(() => {
        alert('Buyer Blocked Successfully!!');
        this.ngOnInit();
      });
  }}
  UnLockBuyer(id){
    console.log(id);
    if(confirm('Are you sure you want to unlock this Buyer ?')){
      this.userManagmentService.UnlockUser(id).subscribe(()=>{
        alert ('Buyer Unlocked!!');
        this.ngOnInit();
      })
    }
  }
  openBuyer(buyer){

    this.ngxSmartModalService.setModalData(buyer, 'viewBuyer');
    this.ngxSmartModalService.getModal('viewBuyer').open();
    this.modalService = this.ngxSmartModalService.getModal('viewBuyer').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('viewBuyer');
      }
    );
  }
  closeBuyer(){
    this.ngxSmartModalService.close('viewBuyer');
  }

  loadData(){
    this.userService.getAllBuyers().toPromise()
    .then( res => {
      this.users = res;
      this.showSpinner=false;
      console.log(this.users);
    })
    .catch( err => console.log(err));
  }
  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.users);
  }
  ngOnDestroy(){
    if(this.modalService){
      this.modalService.unsubscribe();
    }
  }
}
