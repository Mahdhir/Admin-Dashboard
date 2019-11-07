import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsermanagmentService {
  url = `${HelperService.baseURL}/admin`;
  
  constructor(private http: HttpClient) { }
  
  LockUser(userId,forDays){
    if(forDays==null)
    return this.http.post(`${this.url}/LockUser/${userId}`,{});

    return this.http.post(`${this.url}/LockUser/${userId}/${forDays}`,{});
  }
  UnlockUser(userId){
    return this.http.post(`${this.url}/UnLockUser/${userId}`,{});
  }

}
