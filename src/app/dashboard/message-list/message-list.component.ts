import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from './../../services/message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input() userMail: string;

  newMessage: any = {}; 
  // message = ' ';
  allMessages: any = {};
  chat: any = [];
  messageForm: FormGroup;
  showSpinner: boolean = true;
  messages: any;
  userId: any;
  user: any;
  container: HTMLElement;

  constructor(private messageService: MessageService,
              private router: Router,
              public formBuilder: FormBuilder,
              ) { }

  ngOnInit() 
  {
    this.loadMessages();
    this.messageForm = this.formBuilder.group({
      'content' : ['', Validators.required],
    },
    );
    // this.allMessages.subscribe(() => this.showSpinner = false);
  }

  ngAfterViewInit(): void {
    this.container = this.allMessages;
    this.container.scrollLeft = this.container.scrollHeight;
  }

  loadMessages() {
    let data: any =  localStorage.getItem("message");
    localStorage.removeItem("message");
    data = JSON.parse(data);
    // console.log(data);
    this.user = data;
    this.messageService.getMessageForAdminFromUser(data.userMail).subscribe( res => {
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

  sendMessage(sender) {
    this.newMessage.sender = this.userId;
    console.log(this.newMessage);
    let data = {
      receiverEmail:this.user.userMail,
      message:this.newMessage.content
      
    };
    this.messageService.SendMessageFromAdmin(data)
      .subscribe(message => {
        console.log("Message Sent");
        // this.allMessages.unshift(message);
        this.allMessages.push(message);
    }, error => {
      console.log(error);
    });
    this.loadMessages();
    this.newMessage.content = '';
  }

  back() {
    this.router.navigate(['dashboard/messages']);
  }
}
