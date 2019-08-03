import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PromosService {

  url = 'http://localhost:4009/admin';

  constructor(private http: HttpClient) { }

  GetAllPendingPromos() {
    return this.http.get(`${this.url}/promo/pending`);
  }
  GetAllAcceptedPromos() {
    return this.http.get(`${this.url}/promo/active`);
  }

}
