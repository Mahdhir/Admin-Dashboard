import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'http://localhost:4009/orders';

  constructor(private http: HttpClient) { }

  GetAllOrders() {
    return this.http.get(`${this.url}/orders`);
  }
}
