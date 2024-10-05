import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Products } from '../Models/products';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl='https://localhost:7233/api/ProductImage';
  private apiUrlTest='https://localhost:7233/api/Product';
  constructor() { }

  http = inject(HttpClient)

  getAllProducts()
  {
    return this.http.get<ApiResponse<Products[]>>(this.apiUrl);
  }

  addProduct(data : any)
  {
    return this.http.post<Products>(this.apiUrlTest, data);
  }
}
