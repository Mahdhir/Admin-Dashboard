import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = 'http://localhost:4009/chat';

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

  SendMessageFromAdmin(message) {
    return this.http.post(`${this.url}/admin`, message);
  }

}
