import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url = 'http://localhost:4009/orders';
  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get(`${this.url}/orders`);
  }

}
