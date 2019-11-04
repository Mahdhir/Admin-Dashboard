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
  index = 0;
  modalService: any;
  
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
  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.allOrders);
  }

  openModal(order) {

    //view order details
    this.ngxSmartModalService.setModalData(order, 'myModal');
    this.ngxSmartModalService.getModal('myModal').open();
    this.modalService = this.ngxSmartModalService.getModal('myModal').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('myModal');
      }
    );
  }

  nextModal(data:[]) {
    console.log(data.length);
    if(data.length>=this.index+2)
    this.index ++;
  }

  closeModal() {
    this.ngxSmartModalService.close('myModal');
  }

}
