import { HelperService } from './helper.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = `${HelperService.baseURL}/chat`;

  constructor(private http: HttpClient) { }

  getMessageForAdminFromUser(userEmail) {

    return this.http.get(`${this.url}/admin/${userEmail}`);
  }

  getLastMessageFromUsers() {
    return this.http.get(`${this.url}/admin/all`);
  }

  getUnreadMessageForAdmin() {
    return this.http.get(`${this.url}/admin/unread`);
  }

  SendMessageFromAdmin(data) {
    return this.http.post(`${this.url}/admin`,data);
  }

  MakeUnreadMessagesAsReadAdmin(userId) {
    return this.http.post(`${this.url}/admin/opened/${userId}`,{});
  }

}
