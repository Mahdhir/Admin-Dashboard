import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-flagged-products',
  templateUrl: './flagged-products.component.html',
  styleUrls: ['./flagged-products.component.css']
})

export class FlaggedProductsComponent implements OnInit {
  dataSaved = false;
  allProducts: any = [];
  searchText = null;
  messaage = null;
  showSpinner = true;
  image = false;
  modalService: any;
  placeholder = "https://via.placeholder.com/500";
  imageObject: Array<object> = [];
  imageSize = {
    width: 400, 
    height: 400
  };

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
    this.productService.getAllUnflaggedProducts().subscribe(res => {
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
        this.toastCtrl.success('Record Deleted Succefully');
        this.loadAllProducts();

      });
    }
  }

  unflagProduct(productId) {
    if (confirm('Are you sure you want to unflag this ?')) {
      this.productService.unflagProduct(productId).toPromise().then(() => {
        this.dataSaved = true;
        this.messaage = 'Record Deleted Succefully';
        this.toastCtrl.success('Product Unflagged Successfully');
        this.loadAllProducts();
      })
        .catch(
          err => {
            this.toastCtrl.error(err.error.message, 'Error Unflagging Product');
          }
        );
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

  async openProduct(product) {
    this.imageObject = [];
    let obj = {
      ...product
    };
    try {
      let productData = await this.productService.getProductById(product.id).toPromise();
      console.log(productData);
      obj = {
        ...productData
      };
      if (obj.photos.length > 0) {
        obj.photos.forEach(element => {
          let imageObj = {
            image: element.url,
            thumbImage: element.url
          };
          this.imageObject.push(imageObj);
        });
      } else {
        let imageObj = {
          image: this.placeholder,
          thumbImage: this.placeholder
        };
        this.imageObject.push(imageObj);
      }
      obj = {
        ...obj,
        imageObject:this.imageObject
      }
    } catch (error) {
      console.log(error);
    }

    this.ngxSmartModalService.setModalData(obj, 'viewProduct');
    this.ngxSmartModalService.getModal('viewProduct').open();
    this.modalService = this.ngxSmartModalService.getModal('viewProduct').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('viewProduct');
      }
    );
  }
  closeProduct() {
    this.ngxSmartModalService.close('viewProduct');
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

