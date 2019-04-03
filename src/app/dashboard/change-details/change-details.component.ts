import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-details',
  templateUrl: './change-details.component.html',
  styleUrls: ['./change-details.component.css']
})
export class ChangeDetailsComponent implements OnInit {
  user;
  updateForm: FormGroup;
  str: string;
  constructor(
    private formBuilder: FormBuilder,
    private authServices: AuthService,
    private toastCtrl: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      // tslint:disable-next-line:object-literal-key-quotes
      'username': ['', Validators.email],
      // tslint:disable-next-line:object-literal-key-quotes
      'firstName': ['', Validators.pattern('^[a-zA-Z]*$')],
      // tslint:disable-next-line:object-literal-key-quotes
      'lastName': ['', Validators.pattern('^[a-zA-Z]*$')]
    });
  }

  async onSubmit() {
    this.user = this.authServices.getDetails();
    console.log(this.updateForm.value);
    console.log(this.user);

    const firstName = this.updateForm.value.firstName;
    const lastName = this.updateForm.value.lastName;
    const username = this.updateForm.value.username.trim();

    if (firstName !== '') {
      this.user.firstName = firstName;
    }

    if (lastName !== '') {
      this.user.lastName = lastName;
    }

    if (username !== '') {
      this.user.username = username;
    }
    console.log(this.user);
    try {
      await this.authServices.updateDetails(this.user).toPromise();
      this.toastCtrl.success('Update Successfully');
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(this.user));
      this.router.navigate(['dashboard/info']);
    } catch (error) {
      console.log(error);
      if (error.status === 400) {
        this.toastCtrl.error('Update Failure.\n' + error.error.message);
      } else if (error.status === 200) {
        this.toastCtrl.success('Update Successfully');
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['dashboard/info']);
      } else {
        this.toastCtrl.error('Server Error');
      }
    }
  }

}
