import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  id;
  code;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastrService
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    console.log(this.route.snapshot.queryParams.code);
    this.code = this.route.snapshot.queryParams.code;
  }

async submitData() {
    console.log('Submit');
    try {
      await this.authService.submitEmailVerification(this.id, this.code).toPromise();
      // this.toastCtrl.success('Success', 'Email Successfully Verified');
      // this.router.navigate(['login']);
    } catch (error) {
      if (error.status === 400 || error.status === 401) {
          this.toastCtrl.error('Email Verification Failed', 'Invalid Authorization');
          this.router.navigate(['login']);
      } else if (error.status === 200) {
        this.toastCtrl.success('Success', 'Email Successfully Verified');
        this.router.navigate(['login']);
      } else {
        this.toastCtrl.error('Email Verification Failed', 'Server Error');
        this.router.navigate(['login']);
      }
    }
  }
}
