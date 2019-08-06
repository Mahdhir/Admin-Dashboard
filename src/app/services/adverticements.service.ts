import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdverticementsService {

  url = 'http://localhost:4009/admin';
    constructor(private http: HttpClient) {
  
     }

  GetAllPendingAdvertisement(){
    return this.http.get(`${this.url}/pendingAdvertisements`);
  }
  GetAllAcceptedAdvertisement(){
    return this.http.get(`${this.url}/acceptedAdvertisements`);
  }
  GetAllRejectedAdvertisement(){
    return this.http.get(`${this.url}/rejectedAdvertisements`);
  }
  UpdateAdStatus(obj,reason){
    return this.http.put(`${this.url}/approval/${reason}`,obj);
  }
  
 }
