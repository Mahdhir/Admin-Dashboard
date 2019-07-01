import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4009/users';
  constructor(private http: HttpClient) { }

  getAllBuyers(){
    return this.http.get(`${this.url}/allBuyers`);
  }
}
