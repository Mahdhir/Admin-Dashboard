import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth-service.service';

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
  showSpinner: boolean = true;
  constructor(
    private productService: ProductService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loadAllProducts();
    this.allProducts.subscribe(() => this.showSpinner = false);
  }

  logOut() {
    this.authService.logout();
    console.log('Logout');
  }

  loadAllProducts() {
    this.productService.getAllProduct().subscribe( res => {
      this.allProducts = res;
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

}
