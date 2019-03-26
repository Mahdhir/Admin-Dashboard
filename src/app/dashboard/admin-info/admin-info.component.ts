import { Component, OnInit } from '@angular/core';
import { AdminData } from 'src/app/models/admin-data';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
adminDetails: AdminData;
  constructor(
    private authServices: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.adminDetails = this.authServices.getDetails();
    console.log(this.adminDetails);
  }

  addAdmin() {
    this.router.navigate(['dashboard/addAdmin']);
  }

}
