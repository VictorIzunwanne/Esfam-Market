import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
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
