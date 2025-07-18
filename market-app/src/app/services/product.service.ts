import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://192.168.15.213:3000/api/products';

  constructor(private http: HttpClient) {}

  addProduct(productData: any) {
    return this.http.post(this.apiUrl, productData);
  }

  
}
