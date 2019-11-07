import { HelperService } from './helper.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = `${HelperService.baseURL}/category`;
  url1 = `${HelperService.baseURL}/photo`;

  constructor(private http: HttpClient) { }

  GetCategorywithSubCategories() {
    return this.http.get(`${this.url}`);
  }

  AddCategory(data) {
    return this.http.post(`${this.url}`, data);
  }
  
  UpdateCategory(data) {
    return this.http.put(`${this.url}/updateCategory`, data);
  }

  DeleteCategory(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

  AddSubCategory(data, Id) {
    return this.http.post(`${this.url}/addsubcategory/${Id}`, data);
  }

  DeleteSubCategory(categoryId, SubcategoryId) {
    return this.http.delete(`${this.url}/subcategory/${categoryId}/${SubcategoryId}`);
  }

  AddSubCategoryPhoto(SubCategoryId, Photo) {
    return this.http.post(`${this.url1}/subCategory/${SubCategoryId}`, Photo);
  }
}
