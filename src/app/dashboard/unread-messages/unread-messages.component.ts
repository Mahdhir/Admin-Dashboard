import { Router } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unread-messages',
  templateUrl: './unread-messages.component.html',
  styleUrls: ['./unread-messages.component.css']
})
export class UnreadMessagesComponent implements OnInit {
  unreadMessages: any = [];
  showSpinner: boolean = true;

  constructor(private messageService: MessageService,
              private router: Router) { }

  ngOnInit() {
    this.loadUnreadMessages();
    this.unreadMessages.subscribe(() => this.showSpinner = false);
  }

  loadUnreadMessages() {
    this.messageService.getLastMessageFromUsers().subscribe( res => {
      this.unreadMessages = res;
      console.log(this.unreadMessages);
    },
    error => {
      console.log(error);
      if (error.status === 0) {
        alert('Connection Error');
      }
    }
    );
  }

  viewChat(userId) {
     console.log(userId);
  }

}
