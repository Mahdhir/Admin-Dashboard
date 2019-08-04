import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service.service';
import { PromosService } from 'src/app/services/promos.service';

@Component({
  selector: 'app-activePromos',
  templateUrl: './activePromos.component.html',
  styleUrls: ['./activePromos.component.css']
})

export class ActivePromosComponent implements OnInit {

  allActivePromos: Object;
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

  loadAllPromos() {
    this.advertServices.GetAllAcceptedPromos().subscribe(res => {
      this.allActivePromos = res;
      console.log(this.allActivePromos);
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
