import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
  });
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
          this.toastCtrl.error('Registration Failure');
        } else {
          this.toastCtrl.error('Server Error');
        }
      }
    );
  }

  get f() { return this.registerForm.controls; }

}
