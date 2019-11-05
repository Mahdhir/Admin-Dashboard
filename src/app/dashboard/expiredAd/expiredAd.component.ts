import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdverticementsService } from '../../services/adverticements.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-expiredAd',
  templateUrl: './expiredAd.component.html',
  styleUrls: ['./expiredAd.component.css']
})
export class ExpiredAdComponent implements OnInit {

  allRejAds: Object;
  adStatus: Object;
  searchText = null;
  viewImg = false;
  showSpinner = true;
  modalService: any;

  constructor(
    private advertServices: AdverticementsService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadAllAds();
  }

  loadAllAds() {
    this.advertServices.GetAllRejectedAdvertisement().subscribe(res => {
      this.allRejAds = res;
      this.showSpinner = false
      console.log(this.allRejAds);
    },
      error => {
        console.log(error);
        if (error.status === 0) {
          alert('Connection Error');
        }
      }
    );
  }

  openAdvert(advert) {

    this.ngxSmartModalService.setModalData(advert, 'myModal');
    this.ngxSmartModalService.getModal('myModal').open();
    this.modalService = this.ngxSmartModalService.getModal('myModal').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('myModal');
      }
    );
  }

  closeAdvert() {
    this.ngxSmartModalService.close('myModal');
  }

  ngOnDestroy() {
    if (this.modalService) {
      this.modalService.unsubscribe();
    }
  }

  back() {
    this.router.navigate(['dashboard/info']);
  }
}
