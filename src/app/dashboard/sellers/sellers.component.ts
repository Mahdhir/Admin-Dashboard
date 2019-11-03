import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {UsermanagmentService} from 'src/app/services/usermanagment.service'
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  users: any = [];
  dataSaved =false;
  searchText = null;
  modalService: any;
  messaage = null;
  showSpinner =  true;
  constructor(
    private userManagmentService : UsermanagmentService,
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
  onImgError(event) { 
    event.target.src = 'src\assets\imgs\profile-placeholder.png';
}

  LockSeller(id){
    console.log(id);
    if (confirm('Are you sure you want to block this Seller ?')) {
     
      let fordays = parseInt(window.prompt("Number of Days") );
      debugger;
      if(isNaN(fordays))
      fordays=null;
      this.userManagmentService.LockUser(id,fordays).subscribe(() => {
        alert('Seller Blocked Successfully!!');
        this.ngOnInit();

      });
  }}

  UnLockSeller(id){
    console.log(id);
    if(confirm('Are you sure you want to unlock this Seller ?')){
      this.userManagmentService.UnlockUser(id).subscribe(()=>{
        alert ('Seller Unlocked!!');
        this.ngOnInit();
      })
    }
  }
  
  loadData(){
    this.userService.getAllSellers().toPromise()
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
