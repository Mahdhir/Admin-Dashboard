import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllBuyers() {
    return this.http.get(`${HelperService.baseURL}/users/allBuyers`);
  }

  getAllSellers() {
    return this.http.get(`${HelperService.baseURL}/users/allSellers`);
  }

}
