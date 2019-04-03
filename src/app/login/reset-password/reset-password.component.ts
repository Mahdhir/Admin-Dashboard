import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  id;
  code;
  changePasswordForm;
  user;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastrService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params.id);
    this.id = this.route.snapshot.params.id;
    console.log(this.route.snapshot.queryParams.code);
    this.code = this.route.snapshot.queryParams.code;

    this.changePasswordForm = this.formBuilder.group({
      // tslint:disable-next-line:object-literal-key-quotes
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      // tslint:disable-next-line:object-literal-key-quotes
      'confirmPassword': ['', Validators.required]
    },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string): ValidationErrors | null {
    return (group: FormGroup): { [key: string]: any } => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      } else { return null; }
    };
  }

  async onSubmit() {

    console.log(this.changePasswordForm.value);
    this.user = {
      username: this.id,
      activationCode: this.code,
      password: this.changePasswordForm.value.password,
      confirmPassword: this.changePasswordForm.value.confirmPassword
    };

    try {
      await this.authService.resetPassword(this.user).toPromise();
      this.toastCtrl.success('Password Reset Successful', 'Success');
      this.router.navigate(['login']);
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        this.toastCtrl.error('Invalid Credintials', 'Password Reset Fail');
      } else if (error.status === 200) {
        this.toastCtrl.success('Password Reset Successful', 'Success');
        this.router.navigate(['login']);
      } else {
        this.toastCtrl.error('Server Error');
      }
    }
  }
}
