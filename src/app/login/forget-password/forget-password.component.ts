import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  emailSubmitForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastrService
  ) { }

  ngOnInit() {
    this.emailSubmitForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
  });
  }

  async onSubmit() {
    console.log(this.emailSubmitForm.value.email);
    try {
      await this.authService.submitEmailForgetPassword(this.emailSubmitForm.value.email).toPromise();
      this.toastCtrl.success('Password Reset Token Sent To Email', 'Success');
      this.router.navigate(['login']);
    } catch (error) {
      if (error.status === 404 ) {
        this.toastCtrl.error('Invalid Credintials', 'Password Reset Fail');
      } else if (error.status === 201) {
        this.toastCtrl.success('Password Reset Token Sent To Email', 'Success');
        this.router.navigate(['login']);
      } else {
        this.toastCtrl.error('Server Error');
      }
    }
  }

}
