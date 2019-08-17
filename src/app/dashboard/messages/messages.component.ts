import { AuthService } from './../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, Output } from '@angular/core';

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
  searchText = null;

  constructor(private messageService: MessageService,
              private fb: FormBuilder,
              private router: Router,
              private authservice: AuthService) { }

  ngOnInit() {

    this.loadAllMessages();
    // this.loadChat();

    // this.allMessages.subscribe(() => this.showSpinner = false);
    // this.allChat.subscribe(() => this.showSpinner = false);
  }

    logOut(){
    this.authservice.logout();
    console.log("logout");
    }
    loadAllMessages() {
      this.messageService.getLastMessageFromUsers().subscribe( res => {
        this.allMessages = res;
        this.showSpinner = false;
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
    search(ev: any) {
      console.log(ev.target.value);
      this.searchText = ev.target.value;
  
      console.log(this.allMessages);
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
