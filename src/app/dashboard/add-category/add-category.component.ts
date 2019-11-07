import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  categoryForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder, 
    private categoryService: CategoryService, 
    private route: Router,
    private toastCtrl: ToastrService,
    ) {}

  ngOnInit() {
    // this.categoryForm = this.formBuilder.group({
    //   // tslint:disable-next-line:object-literal-key-quotes
    //   'categoryName': ['', Validators.required],
    //   // tslint:disable-next-line:object-literal-key-quotes
    //   'subCat1Name': ['', Validators.required],
    //   // tslint:disable-next-line:object-literal-key-quotes
    //   'subCat2Name': ['', Validators.required],

    //   'alternatesubCategories': this.formBuilder.array([])

    // },
    // );
    // },
    // );
  }

  // get alternatesubCategories() {
  //   return this.categoryForm.get('alternatesubCategories') as FormArray;
  // }

  // addAlternateSubCategories() {
  //   this.alternatesubCategories.push(this.formBuilder.control(''));
  // }

  // onSubmit() {
  //   console.log('Submitted');
  //   this.submitted = true;
  //   if (this.categoryForm.invalid) {
  //     console.log('Invalid');
  //     return;
  //   }
  //   this.categoryService.AddCategory(this.categoryForm.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         console.log(this.categoryForm.value);
  //         this.toastCtrl.success('Category is added Successfully');
  //         this.route.navigate(['dashboard/categoryInfo']);
  //       },
  //       error => {
  //         console.log(error);
  //         if (error.status === 400) {
  //           this.toastCtrl.error('Cannot add category.\n' + error.error.message);
  //         } else {
  //           this.toastCtrl.error('Server Error');
  //         }
  //       }
  //     );
  // }

}

