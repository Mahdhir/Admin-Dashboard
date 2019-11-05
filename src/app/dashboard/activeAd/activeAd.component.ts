import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdverticementsService } from '../../services/adverticements.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-activeAd',
  templateUrl: './activeAd.component.html',
  styleUrls: ['./activeAd.component.css']
})
export class ActiveAdComponent implements OnInit {

  allActiveAds: Object;
  adStatus: Object;
  viewImg = false;
  showSpinner = true;
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

  loadAllAds() {
    this.advertServices.GetAllAcceptedAdvertisement().subscribe(res => {
      this.allActiveAds = res;
      this.showSpinner = false;
      console.log(this.allActiveAds);
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
}

