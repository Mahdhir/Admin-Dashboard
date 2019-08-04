import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service.service';
import { PromosService } from 'src/app/services/promos.service';

@Component({
  selector: 'app-pendingPromos',
  templateUrl: './pendingPromos.component.html',
  styleUrls: ['./pendingPromos.component.css']
})
export class PendingPromosComponent implements OnInit {

  allPendingPromos: Object;
  promoStatus: Object;
  viewImg = false;
  modalService: any;

  constructor(
    private advertServices: PromosService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.loadAllPromos();
  }
  async accept(id) {
    console.log({ id });
    const obj = {
      id: id,
      status: "accepted"
    };
    try {
      let data = await this.advertServices.UpdatePromoStatus(obj).toPromise();
      console.log(data);
      this.loadAllPromos();
    } catch (error) {
      console.log(error);
    }
  }

  async reject(id) {
    let reason = window.prompt("Reason for rejection");
    const obj = {
      id: id,
      status: "rejected",
      reason
    };
    try {
      if (reason) {
        let data = await this.advertServices.UpdatePromoStatus(obj).toPromise();
        console.log(data)
        this.loadAllPromos();
      }else{
        this.toastCtrl.error("Rejection Failed","No Reason Given");
      }

    } catch (error) {
      console.log(error);
    }
  }

  loadAllPromos() {
    this.advertServices.GetAllAcceptedPromos().subscribe(res => {
      this.allPendingPromos = res;
      console.log(this.allPendingPromos);
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
