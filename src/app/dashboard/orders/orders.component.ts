import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { FormBuilder } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
              private fb: FormBuilder,
              private router: Router,
  ) { }

  ngOnInit() { }

}
