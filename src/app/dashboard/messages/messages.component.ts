import { Message } from './../../models/message';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth-service.service';
import { MessageService } from './../../services/message.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messageService: MessageService, private fb: FormBuilder) { }

  chatForm = this.fb.group({
    message: [''],
  });

  get message() {
    return this.chatForm.get('message');
  }

  sendMessage() {
    document.getElementById('message').innerHTML = '';
    console.log(this.chatForm.value);
    this.messageService.SendMessageFromAdmin(this.chatForm.value)
    .subscribe(
      response => console.log('Message Sent', response),
      error => console.log('Error', error)
    );
  }

  ngOnInit() {
    $(document).ready(function() {

      const preloadbg = document.createElement('img');
      preloadbg.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png';

      $('#searchfield').focus(function() {
        if ($(this).val() === 'Search contacts...') {
          $(this).val('');
        }
      });
      $('#searchfield').focusout(function() {
        if ($(this).val() === '') {
          $(this).val('Search contacts...');
        }
      });

      $('#sendmessage input').focus(function() {
        if ($(this).val() === 'Send message...') {
          $(this).val('');
        }
      });
      $('#sendmessage input').focusout(function() {
        if ($(this).val() === '') {
          $(this).val('Send message...');

        }
      });

      $('.friend').each(function(){
        $(this).click(function() {
          const childOffset = $(this).offset();
          const parentOffset = $(this).parent().parent().offset();
          const childTop = childOffset.top - parentOffset.top;
          const clone = $(this).find('img').eq(0).clone();
          const top = childTop + 12 + 'px';

          $(clone).css({'top': top}).addClass('floatingImg').appendTo('#chatbox');

          setTimeout(function() {$('#profile p').addClass('animate'); $('#profile').addClass('animate'); }, 100);
          setTimeout(function() {
            $('#chat-messages').addClass('animate');
            $('.cx, .cy').addClass('s1');
            setTimeout(function() {$('.cx, .cy').addClass('s2'); }, 100);
            setTimeout(function() {$('.cx, .cy').addClass('s3'); }, 200);
          }, 150);

          $('.floatingImg').animate({
            width: '68px',
            left: '108px',
            top: '20px'
          }, 200);

          const name = $(this).find('p strong').html();
          const email = $(this).find('p span').html();
          $('#profile p').html(name);
          $('#profile span').html(email);

          $('.message').not('.right').find('img').attr('src', $(clone).attr('src'));
          $('#friendslist').fadeOut();
          $('#chatview').fadeIn();

          $('#close').unbind('click').click(function() {
            $('#chat-messages, #profile, #profile p').removeClass('animate');
            $('.cx, .cy').removeClass('s1 s2 s3');
            $('.floatingImg').animate({
              width: '40px',
              top: 'top',
              left: '12px'
            }, 200, function() {$('.floatingImg').remove()});

            setTimeout(function() {
              $('#chatview').fadeOut();
              $('#friendslist').fadeIn();
            }, 50);
          });
        });
      });
    });
  }

}
