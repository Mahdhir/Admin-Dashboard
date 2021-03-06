import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PromosService {

  url = `${HelperService.baseURL}/admin`;

  constructor(private http: HttpClient) { }

  GetAllPendingPromos() {
    return this.http.get(`${this.url}/promo/pending`);
  }
  GetAllAcceptedPromos() {
    return this.http.get(`${this.url}/promo/active`);
  }
  UpdatePromoStatus(obj){
    return this.http.put(`${this.url}/promo/approval`,obj);
  }

}
