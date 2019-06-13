import { AuthService } from 'src/app/services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent{

  categoryForm = this.fb.group({
    category: [''],
    subCategory: [''],
    alternatesubCategories: this.fb.array([]),
  });

  get alternatesubCategories() {
    return this.categoryForm.get('alternatesubCategories') as FormArray;
  }

  addAlternateSubCategories() {
    this.alternatesubCategories.push(this.fb.control(''));
  }

  onSubmit() {
    console.log(this.categoryForm.value);
    // this.authService.addcategory(this.categoryForm.value)
    //                 .subscribe(
    //                   response => console.log('Category Added', response),
    //                   error => console.error('Error', error)
    //                 )

  }

  constructor(private fb: FormBuilder, private authService: AuthService) {}
}
