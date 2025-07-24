import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://esfam-market.onrender.com/api/products';

  constructor(private http: HttpClient) {}

  addProduct(productData: any) {
    return this.http.post(this.apiUrl, productData);
  }

  
}
