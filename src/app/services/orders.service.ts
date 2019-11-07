import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  url = `${HelperService.baseURL}/orders`;

  constructor(private http: HttpClient) { }

  getAllOrders() {
    return this.http.get(`${this.url}/orders`);
  }

}
