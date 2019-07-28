import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {
  public categoryDetails$;

  constructor(private router: Router,
              private authServices: AuthService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryDetails$ = this.categoryService.getCategories();

    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(() => {
      $('#myModal').modal();
    });
  }

  addCategory() {
    this.router.navigate(['dashboard/addCategory']);
  }

}
