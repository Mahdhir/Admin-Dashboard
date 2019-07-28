import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return [
      {"category": "Apparel for Women", "subCategory1": "Dresses", "subCategory2":"Tops & Tees", "alternatesubCategories": [ "Bottoms", "Suits & Sets" ]},
      {"category": "Apparel for Men", "subCategory1": "Tops & Tess", "subCategory2":"Shirts", "alternatesubCategories": [ "Jeans", "Shorts", "Casual Wear" ]},
      {"category": "Home & Garden", "subCategory1": "Home Decor", "subCategory2":"Arts, Crafts & Sewing", "alternatesubCategories": [ "Pet Products"]},
      {"category": "Computer & Office", "subCategory1": "Laptops", "subCategory2":"Tablets", "alternatesubCategories": [ "Laptop Accessories", "Gaming Laptops"]},
      {"category": "Jewellery & Accessories", "subCategory1": "Earrings", "subCategory2":"Necklaces & Pendants", "alternatesubCategories": ["Rings", "Jewellery Sets", "Fine Jewellery"]},
      {"category": "Toys & Hobbies", "subCategory1": "Dolls & Stuffed Toys", "subCategory2":"Electronic Toys", "alternatesubCategories": ["Building & Construction Toys", "Puzzles & Games", "Learning & Education"]}
  ];
  }
}
