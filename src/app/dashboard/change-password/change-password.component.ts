import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user;
  changePasswordForm;
  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private toastCtrl: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.user = this.authServices.getDetails();
    this.user.password = this.changePasswordForm.value.password.trim();
    console.log(this.user);
    try {
      const result = await this.authServices.updateDetails(this.user).toPromise();
      this.toastCtrl.success('Password Changed Successfully');
      this.router.navigate(['dashboard/info']);
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        this.toastCtrl.error('Password Change Failure.\n' + error.error.message);
      } else if (error.status === 200) {
        this.toastCtrl.success('Password Changed Successfully');
        this.router.navigate(['dashboard/info']);
      } else {
        this.toastCtrl.error('Server Error');
      }
    }
  }

}
