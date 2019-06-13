import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {
  //categoryDetails: CategoryData;

  constructor(private router: Router, private authServices: AuthService,) { }

  ngOnInit() {
    /*this.categoryDetails = this.authServices.getDetails();
    console.log(this.categoryDetails);*/
  }

  addCategory() {
    this.router.navigate(['dashboard/addCategory']);
  }

}
