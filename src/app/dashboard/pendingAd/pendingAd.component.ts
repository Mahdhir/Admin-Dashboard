import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdverticementsService } from '../../services/adverticements.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-pendingAd',
  templateUrl: './pendingAd.component.html',
  styleUrls: ['./pendingAd.component.css'],
})
export class PendingAdComponent implements OnInit {
  allPendingAds: Object;
  adStatus: Object;
  searchText = null;
  viewImg = false;
  modalService: any;
  
  constructor(
    private advertServices: AdverticementsService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.loadAllAds();
  }

  logOut() {
    this.authService.logout();
    console.log('Logout');
  }

  loadAllAds() {
    this.advertServices.GetAllPendingAdvertisement().subscribe(res => {
      this.allPendingAds = res;
      console.log(this.allPendingAds);
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          alert('Connection Error');
        }
      }
    );
  }

  async accept(id) {
    console.log({ id });
    const obj = {
      id: id,
      status: "accepted"
    };
    try {
      let data = await this.advertServices.UpdateAdStatus(obj, null).toPromise();
      console.log(data);
      this.loadAllAds();
    } catch (error) {
      console.log(error);
    }
  }

  async reject(id) {
    const obj = {
      id: id,
      status: "rejected"
    };
    let reason = window.prompt("Reason for rejection");
    try {
      if (reason) {
        let data = await this.advertServices.UpdateAdStatus(obj, reason).toPromise();
        console.log(data)
        this.loadAllAds();
      }else{
        this.toastCtrl.error("Rejection Failed","No Reason Given");
      }

    } catch (error) {
      console.log(error);
    }
  }

  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.allPendingAds);
  }
  
  img(){
    this.viewImg = true;
  }

  openAdvert(advert){

    this.ngxSmartModalService.setModalData(advert, 'myModal');
    this.ngxSmartModalService.getModal('myModal').open();
    this.modalService = this.ngxSmartModalService.getModal('myModal').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('myModal');
      }
    );
  }

  closeAdvert(){
    this.ngxSmartModalService.close('myModal');
  }
  
  ngOnDestroy(){
    if(this.modalService){
      this.modalService.unsubscribe();
    }
  }
}
