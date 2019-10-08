import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { ToastrService } from 'ngx-toastr';
// import { AuthService } from '../services/auth-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private authGuard: AuthGuard,
    private toastCtrl: ToastrService,
    private cd: ChangeDetectorRef
    // private authService: AuthService
    ) { }

  ngOnInit() {
    console.log('On init');
  }

  //UNCOMMENT WHEN DONE

  // ngDoCheck() {
  //   if (!this.authGuard.canActivate()) {
  //     this.cd.detectChanges();
  //     this.toastCtrl.warning('Session Expired. Please Login');
  //   }
  // }

}
