import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  users: any = [];
  searchText = null;
  modalService: any;
  constructor(
    private userService: UserService,
    private authservice: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
    ) {
  }

  ngOnInit() {
    this.loadData();
  }
  
  logOut(){
    this.authservice.logout();
    console.log("logout");
  }

  loadData(){
    this.userService.getAllSellers().toPromise()
    .then( res => {
      this.users = res;
      console.log(this.users);
    })
    .catch( err => console.log(err));
  }
  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.users);
  }
  openSeller(seller){

    this.ngxSmartModalService.setModalData(seller, 'viewSeller');
    this.ngxSmartModalService.getModal('viewSeller').open();
    this.modalService = this.ngxSmartModalService.getModal('viewSeller').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('viewSeller');
      }
    );
  }
  closeSeller(){
    this.ngxSmartModalService.close('viewSeller');
  }
  ngOnDestroy(){
    if(this.modalService){
      this.modalService.unsubscribe();
    }
  }
}
