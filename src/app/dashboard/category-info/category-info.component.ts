import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/services/auth-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})

export class CategoryInfoComponent implements OnInit {
  modalService: any;
  allCategories: any = [];
  index = 0;
  dataSaved = false;
  showSpinner =  true;
  messaage = null;
  categoryForm: FormGroup;
  updateCategoryForm: FormGroup;
  subCategoryForm: FormGroup;
  submitted = false;
  id: number;
  CategoryId: any;
  CategoryName: any;
  categoryName;
  imageUrl: string = '../assets/imgs/deafult.jpg';
  fileToUpload: File = null;

  constructor(private route: Router,
              private authServices: AuthService,
              private categoryService: CategoryService,
              public ngxSmartModalService: NgxSmartModalService,
              public formBuilder: FormBuilder,
              private toastCtrl: ToastrService,
              private router: Router
              ) { }

  ngOnInit() {
    this.loadAllCategories();
    this.categoryForm = this.formBuilder.group({
      'categoryName': ['', Validators.required],
    },
    );

    this.subCategoryForm = this.formBuilder.group({
      'SubCategoryName': ['', Validators.required],
      'url': ['', Validators.required],
    },
    );

    this.updateCategoryForm = this.formBuilder.group({
      // tslint:disable-next-line:object-literal-key-quotes
      'categoryName': ['', Validators.required],
    },
    );
 
  }

  onFileChanged(file: FileList){
    this.fileToUpload = file.item(0);

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  loadAllCategories() {
    this.categoryService.GetCategorywithSubCategories().subscribe( res => {
      this.allCategories = res;
      this.showSpinner = false;
      console.log(this.allCategories);
    },
    error => {
      console.log(error);
      if (error.status === 0) {
        alert('Connection Error');
      }
    }
    );
  }

  addCategory() {
    setTimeout(() => {
    console.log('Submitted');
    this.submitted = true;
    if (this.categoryForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.categoryService.AddCategory(this.categoryForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(this.categoryForm.value);
          this.toastCtrl.success('Category is added Successfully');
          this.categoryForm.reset();
          this.closeModal();
          this.loadAllCategories();
        },
        error => {
          console.log(error);
          if (error.status === 400) {
            this.toastCtrl.error('Cannot add category.\n' + error.error.message);
          } else {
            this.toastCtrl.error('Server Error');
          }
        }
      );
    });
  }

  editCategoryDetails() {
    this.categoryName = this.CategoryName
    console.log(this.updateCategoryForm.value);
    console.log(this.categoryName);

    const categoryName = this.updateCategoryForm.value.categoryName;

    if (categoryName != '') {
      this.CategoryName = categoryName;
    }
    console.log(this.CategoryName);
    let data = {
      id: this.CategoryId,
      categoryName: this.CategoryName
    }
    this.categoryService.UpdateCategory(data)
      .subscribe(data => {
        console.log("Updated!");
        this.toastCtrl.success('Successfully Updated');
        this.updateCategoryForm.reset();
        this.closeModal();
        this.loadAllCategories();
      },
      error => {
        console.log(error);
        if (error.status === 400) {
          this.toastCtrl.error('Cannot update details.\n' + error.error.message);
        } else {
          this.toastCtrl.error('Server Error');
        }
      }
    );
  }

  addSubCategory() {
    console.log('Submitted');
    this.submitted = true;
    if (this.subCategoryForm.invalid) {
      console.log('Invalid');
      return;
    }
    console.log(this.subCategoryForm.value, this.CategoryId);
    this.categoryService.AddSubCategory(this.subCategoryForm.value, this.CategoryId)
      .pipe(first())
      .subscribe(
        data => {
          const uploadData = new FormData();
          uploadData.append('file', this.fileToUpload, this.fileToUpload.name);
          this.categoryService.AddSubCategoryPhoto(data,uploadData).subscribe(
            data => {
              this.toastCtrl.success('Sub Category is added Successfully');
              this.subCategoryForm.reset();
              this.imageUrl = '../assets/imgs/deafult.jpg';
              this.loadAllCategories();
              this.closeModal();
            },
            error => {
              if (error.status === 400) {
                this.toastCtrl.error('Cannot add sub category image.\n' + error.error.message);
              } 
              
            }
          );
          console.log(this.subCategoryForm.value);
    
        },
        error => {
          console.log(error);
          if (error.status === 400) {
            this.toastCtrl.error('Cannot add sub category.\n' + error.error.message);
          } else {
            this.toastCtrl.error('Server Error');
          }
        }
      );
  }

  deleteCategory(id) {
    console.log(id);
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.DeleteCategory(id).subscribe(() => {
        this.dataSaved = true;
        this.loadAllCategories();
        this.messaage = 'Category Deleted Succefully';
        // alert('Category Deleted Succefully');
        this.toastCtrl.error('Category Deleted');
      });
    }
  }

  deleteSub(categoryId, SubcategoryId) {
    console.log(categoryId, SubcategoryId);
    if (confirm('Are you sure you want to delete this Sub Category?')) {
      this.categoryService.DeleteSubCategory(categoryId, SubcategoryId).subscribe(() => {
        this.loadAllCategories();
        this.messaage = 'Sub Category Deleted Succefully';
        // alert('Category Deleted Succefully');
        this.toastCtrl.error('Sub Category Deleted');
        this.closeModal();
        this.loadAllCategories();
      });
    }
  }

  openModal4(name, id) {
        
    //edit category details
    this.CategoryName = name;
    this.CategoryId = id;
    this.ngxSmartModalService.getModal('editCategory').open();
    this.modalService = this.ngxSmartModalService.getModal('editCategory').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('editCategory');
      }
    );
  }

  openModal3(id) {
        
    //add sub category
    this.CategoryId = id;
    this.ngxSmartModalService.getModal('addSubCategory').open();
    this.modalService = this.ngxSmartModalService.getModal('addSubCategory').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('addSubCategory');
      }
    );
  }

  openModal2() {
        
    //add category
    this.ngxSmartModalService.getModal('addCategory').open();
    this.modalService = this.ngxSmartModalService.getModal('addCategory').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('addCategory');
      }
    );
  }

  openModal(cat) {

    //view category details
    if (cat.subCategorys.length == 0) {
      this.toastCtrl.error('No Sub Categories added!');
    } else {
    this.ngxSmartModalService.setModalData(cat, 'myModal');
    this.ngxSmartModalService.getModal('myModal').open();
    this.modalService = this.ngxSmartModalService.getModal('myModal').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('myModal');
      }
    );
   }
  }

  nextModal(data:[]) {
    console.log(data.length);
    if(data.length>=this.index+2)
    this.index ++;
  }

  closeModal() {
    this.ngxSmartModalService.close('myModal');
    this.ngxSmartModalService.close('addCategory');
    this.ngxSmartModalService.close('addSubCategory');
    this.ngxSmartModalService.close('editCategory');
    this.index = 0;
  }

  back() {
    this.router.navigate(['dashboard/info']);
  }
}
