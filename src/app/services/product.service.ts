import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = `${HelperService.baseURL}/product`;
  urlAdmin = `${HelperService.baseURL}/admin`;

  constructor(private http: HttpClient) {

  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<any>(this.url);
  }

  getAllUnflaggedProducts() {
    return this.http.get(`${this.url}/flag`);
  }

  getProductById(id) {
    return this.http.get(`${this.url}/admin/${id}`);
  }

  deleteProductById(productid: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(`${this.url}/${productid}`,
      httpOptions);
  }

  unflagProduct(id){
    return this.http.post(`${this.urlAdmin}/unflag/${id}`,null);
  }

}
