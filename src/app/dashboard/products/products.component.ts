import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataSaved = false;
  allProducts: Product[];
  messaage = null;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadAllProducts();
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

}
