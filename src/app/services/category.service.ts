import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = 'http://localhost:4009/category';

  constructor(private http: HttpClient) { }

  GetCategorywithSubCategories() {
    return this.http.get(`${this.url}`);
  }

  AddCategory() {
    return this.http.get(`${this.url}`);
  }
}
