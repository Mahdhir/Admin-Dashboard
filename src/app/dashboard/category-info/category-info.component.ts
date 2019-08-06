import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/services/auth-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})

export class CategoryInfoComponent implements OnInit {
  public categoryDetails$;
  modalService: any;

  constructor(private router: Router,
              private authServices: AuthService,
              private categoryService: CategoryService,
              public ngxSmartModalService: NgxSmartModalService
              ) { }

  ngOnInit() {
    this.categoryDetails$ = this.categoryService.getCategories();
  }

  addCategory() {
    this.router.navigate(['dashboard/addCategory']);
  }

  openModal(cat) {

    this.ngxSmartModalService.setModalData(cat, 'myModal');
    this.ngxSmartModalService.getModal('myModal').open();
    this.modalService = this.ngxSmartModalService.getModal('myModal').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('myModal');
      }
    );
  }

  nextModal() {
    // this.index++;
  }

  closeModal() {
    this.ngxSmartModalService.close('myModal');
  }

}
