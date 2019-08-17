import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';


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


  logOut() {
    this.authService.logout();
    console.log('Logout');
  }

  ngOnInit() { 
    this.loadAllOrders();
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


}
