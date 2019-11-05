import { ToastrService } from 'ngx-toastr';
import { AuthService } from "./../../services/auth-service.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "./../../services/message.service";
import { Component, OnInit, Output } from "@angular/core";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { first } from 'rxjs/operators';

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  allMessages: any = [];
  allChat: any = [];
  modalService: any;
  messageForm: FormGroup;
  showSpinner: boolean = true;
  read: any;
  searchText = null;

  constructor(
    private messageService: MessageService,
    public ngxSmartModalService: NgxSmartModalService,
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private toastCtrl: ToastrService
  ) {}

  ngOnInit() {
    this.loadAllMessages();
    this.messageForm = this.fb.group({
      'message': ['', Validators.required],
      'ReceiverEmail' : ['', Validators.required],
    },
    );
    // this.loadChat();

    // this.allMessages.subscribe(() => this.showSpinner = false);
    // this.allChat.subscribe(() => this.showSpinner = false);
  }

  logOut() {
    this.authservice.logout();
    console.log("logout");
  }

  loadAllMessages() {
    this.messageService.getLastMessageFromUsers().subscribe(
      res => {
        this.allMessages = res;
        this.showSpinner = false;
        console.log(this.allMessages);
      },
      error => {
        console.log(error);
        if (error.status === 0) {
          alert("Connection Error");
        }
      }
    );
  }

  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.allMessages);
  }


  newMessage(data) {
    setTimeout(() => {
    console.log(data);
    if (this.messageForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.messageService.SendMessageFromAdmin(this.messageForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.messageForm.value);
          this.toastCtrl.success('Message Sent Successfully');
          this.messageForm.reset();
          this.closeModal();
        },
        error => {
          console.log(error);
          this.messageForm.reset();
          this.closeModal();
          if (error.status === 400) {
            this.toastCtrl.error('Cannot send Message.\n' + error.error.message);
          } else {
            this.toastCtrl.error('Server Error');
          }
        }
      );
    });
  }

  viewChat(message) {
    console.log(message);
    if (message.isUnRead == true) {
      console.log("true");
      this.messageService
        .MakeUnreadMessagesAsReadAdmin(message.sender)
        .subscribe(
          res => {
            this.allMessages = res;
            console.log("true", message.sender);
          },
          error => {
            console.log(error);
            if (error.status === 0) {
              alert("Connection Error");
            }
          }
        );
    }
    let data = JSON.stringify(message);
    localStorage.setItem("message", data);
    this.router.navigate(["dashboard/messageList", message.userMail]);
  }

  openModal2() {
    //new Message
    this.ngxSmartModalService.getModal('newMessage').open();
    this.modalService = this.ngxSmartModalService.getModal('newMessage').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('newMessage');
      }
    );
  }

  closeModal() {
    this.ngxSmartModalService.close('newMessage');
  }

  back() {
    this.router.navigate(["dashboard/info"]);
  }
}
