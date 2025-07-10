import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-market',
  imports: [RouterLink],
  templateUrl: './market.html',
  styleUrl: './market.css',
})
export class Market {
  ngAfterViewInit() {
    this.mostPurchasedProducts();
  }

  products: any[] = [];

  async mostPurchasedProducts() {
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) throw new Error(response.status.toString());
      this.products = await response.json();
    } catch (error) {
      console.error('Cannot fetch most purchased products', error);
    }
  }
}
