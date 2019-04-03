import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  value = 'password';
  showPwd = 'octicon octicon-eye';
  showPass = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastrService
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard/info']);
      return ;
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
  });
  }

  onSubmit() {
    console.log('Submitted');
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('Invalid');
      return;
    }
    // if (this.f.email.value === 'mahdhi@yahoo.com' && this.f.password.value === '1234' ) {
    //     localStorage.setItem('token', '122345666');
    //     this.router.navigate(['dashboard/info']);
    // } else {
    //   alert('Invalid Login');
    // }
    this.authService.login(this.f.email.value, this.f.password.value )
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        // tslint:disable-next-line:triple-equals
        if (data.firstLogin == false) {
          this.router.navigate(['dashboard/info']);
        } else {
          this.router.navigate(['dashboard/changePassword']);
          this.toastCtrl.warning('Please change your first time login password', 'WARNING' );
        }
      },
      error => {
        console.log(error);
        if (error.status === 400) {
          console.log('Invalid Login');
          this.toastCtrl.error('Invalid Login', 'Login Failed');
        } else if (error.status === 401) {
          this.toastCtrl.error('Please Check Your Email For Email Verification', 'Invalid Login');
        } else {
          console.log('Server Error');
          this.toastCtrl.error('Server Error', 'Login Failed');
        }
      }
    );
  }

  get f() { return this.loginForm.controls; }

  butClick() {
    this.showPass ? this.showPwd = 'octicon octicon-eye-closed' : this.showPwd = 'octicon octicon-eye';
  }
}
