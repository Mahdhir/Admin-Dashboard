import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private toastCtrl: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      // tslint:disable-next-line:object-literal-key-quotes
      'username': ['', Validators.compose([Validators.required, Validators.email])],
      // tslint:disable-next-line:object-literal-key-quotes
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      // tslint:disable-next-line:object-literal-key-quotes
      'confirmPassword': ['', Validators.required],
      // tslint:disable-next-line:object-literal-key-quotes
      'firstName': ['', Validators.required],
      // tslint:disable-next-line:object-literal-key-quotes
      'lastName': ['', Validators.required]
    },
      { validator: this.matchingPasswords('password', 'confirmPassword') }
    );
  }

  onSubmit() {
    console.log('Submitted');
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.authServices.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastCtrl.success('Registration Successful');
          this.router.navigate([]);
        },
        error => {
          console.log(error);
          if (error.status === 400) {
            this.toastCtrl.error('Registration Failure.\n' + error.error.message);
          } else {
            this.toastCtrl.error('Server Error');
          }
        }
      );
  }

  get f() { return this.registerForm.controls; }

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


}
