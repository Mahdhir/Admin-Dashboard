import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4009/product';
  constructor(private http: HttpClient) {

   }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/products');
  }
  deleteProductById(productid: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(`${this.url}/${productid}`,
      httpOptions);
  }

}
