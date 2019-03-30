import { Component, OnInit } from '@angular/core';
import { AdminData } from 'src/app/models/admin-data';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-info',
  templateUrl: './admin-info.component.html',
  styleUrls: ['./admin-info.component.css']
})
export class AdminInfoComponent implements OnInit {
adminDetails: AdminData;
  constructor(
    private authServices: AuthService,
    private router: Router,
    private authGuard: AuthGuard,
    private toastCtrl: ToastrService
  ) { }

  ngOnInit() {
    this.adminDetails = this.authServices.getDetails();
    console.log(this.adminDetails);
  }


  addAdmin() {
    this.router.navigate(['dashboard/addAdmin']);
  }

}
