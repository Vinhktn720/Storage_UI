import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../Models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl='https://localhost:7233/api/ProductImage'
  constructor() { }

  http = inject(HttpClient)

  getAllProducts()
  {
    return this.http.get<Products[]>(this.apiUrl);
  }
}
