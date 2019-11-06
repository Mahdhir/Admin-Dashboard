import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataSaved = false;
  allProducts: any = [];
  searchText = null;
  messaage = null;
  showSpinner =  true;
  image = false;
  modalService: any;
  
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private toastCtrl: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    public router: Router
    ) { }

  ngOnInit() {
    this.loadAllProducts();
    
  }

  logOut() {
    this.authService.logout();
    console.log('Logout');
  }

  loadAllProducts() {
    this.productService.getAllProduct().subscribe( res => {
      this.allProducts = res;
      this.showSpinner = false;
      console.log(this.allProducts);
    },
    error => {
      console.log(error);
      if (error.status === 0) {
        alert('Connection Error');
      }
    }
    );


  }

  deleteProduct(productId: number) {
    console.log(productId);
    if (confirm('Are you sure you want to delete this ?')) {
      this.productService.deleteProductById(productId).subscribe(() => {
        this.dataSaved = true;
        this.messaage = 'Record Deleted Succefully';
        alert('Record Deleted Succefully');
        this.loadAllProducts();

      });
    }
  }

  resetTable() {
    this.messaage = null;
    this.dataSaved = false;
  }

  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.allProducts);
  }

  img() {
    this.image = true;
  }

  openProduct(product){

    this.ngxSmartModalService.setModalData(product, 'viewProduct');
    this.ngxSmartModalService.getModal('viewProduct').open();
    this.modalService = this.ngxSmartModalService.getModal('viewProduct').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('viewProduct');
      }
    );
  }
  closeProduct(){
    this.ngxSmartModalService.close('viewProduct');
  }
  ngOnDestroy(){
    if(this.modalService){
      this.modalService.unsubscribe();
    }
  }

  back() {
    this.router.navigate(['dashboard/info']);
  }
}
