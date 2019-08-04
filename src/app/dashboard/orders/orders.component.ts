import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import {OrdersService} from '../../services/orders.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allOrders: any = [];
  searchText = null;
  showSpinner =  true;
  dataSaved = false;
  messaage = null;
  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit() {
    this.loadAllOrders();
  }
  logOut() {
    this.authService.logout();
    console.log('Logout');
  }
  loadAllOrders() {
    this.ordersService.getAllOrders().subscribe( res => {
      this.allOrders = res;
      this.showSpinner = false;
      console.log(this.allOrders);
    },
    error => {
      console.log(error);
      if (error.status === 0) {
        alert('Connection Error');
      }
    }
    );
  }
  resetTable() {
    this.messaage = null;
    this.dataSaved = false;
  }

  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.allOrders);
  }
}
