import { Router } from '@angular/router';
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
  showSpinner = true;
  modalService: any;

  constructor(
    private advertServices: PromosService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    public router: Router
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
    this.advertServices.GetAllPendingPromos().subscribe(res => {
      this.allPendingPromos = res;
      this.showSpinner = false
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

  openAdvert2() {

   // this.ngxSmartModalService.setModalData('myModal2');
    this.ngxSmartModalService.getModal('myModal2').open();
    this.modalService = this.ngxSmartModalService.getModal('myModal2').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('myModal2');
      }
    );
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
