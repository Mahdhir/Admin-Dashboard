import { Router } from '@angular/router';
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
  searchText = null;
  viewImg = false;
  modalService: any;
  showSpinner =  true;

  constructor(
    private advertServices: PromosService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAllPromos();
  }

  loadAllPromos() {
    this.advertServices.GetAllAcceptedPromos().subscribe(res => {
      this.allActivePromos = res;
      this.showSpinner=false;
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

  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;
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
