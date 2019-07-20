import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { AdverticementsService } from '../../services/adverticements.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private advertServices: AdverticementsService,
    private authService: AuthService,
    private toastCtrl: ToastrService
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
        let data = await this.advertServices.UpdateAdStatus(obj, null).toPromise();
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
  
}
