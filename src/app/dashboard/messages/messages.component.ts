import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  allMessages: any = [];
  allChat: any = [];
  showSpinner: boolean = true;
  read: any;

  constructor(private messageService: MessageService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {

    this.loadAllMessages();
    // this.loadChat();

    // this.allMessages.subscribe(() => this.showSpinner = false);
    // this.allChat.subscribe(() => this.showSpinner = false);
  }

    loadAllMessages() {
      this.messageService.getLastMessageFromUsers().subscribe( res => {
        this.allMessages = res;
        console.log(this.allMessages);
      },
      error => {
        console.log(error);
        if (error.status === 0) {
          alert('Connection Error');
        }
      }
      );
    }
  
    viewChat(message) {
      console.log(message);
      if(message.isUnRead==true)
      {
        console.log("true");
        this.messageService.MakeUnreadMessagesAsReadAdmin(message.sender).subscribe( res => {
          this.allMessages = res;
          console.log("true" , message.sender);
        },
        error => {
          console.log(error);
          if (error.status === 0) {
            alert('Connection Error');
          }
        }
        );
      }
      let data = JSON.stringify(message);
      localStorage.setItem("message",data);
      this.router.navigate(['dashboard/messageList', message.userMail]);
    }
}
